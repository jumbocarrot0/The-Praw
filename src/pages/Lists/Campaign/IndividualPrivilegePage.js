import React, { useEffect, useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import TimingBar from "../../../components/TimingBar"
import Privileges from '../../../dataFiles/privileges.json';

export default function IndividualPrivilegePage() {

  const { privilegeIndex } = useParams();

  const [privilege, setPrivilege] = useState(Privileges.privilege[privilegeIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setPrivilege(Privileges.privilege[privilegeIndex].original)
    setRevised(false)
  }, [privilegeIndex])

  return (
    <div>
      {Privileges.privilege[privilegeIndex].revised ?
        <Nav className="ps-5 mx-1" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setPrivilege(Privileges.privilege[privilegeIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setPrivilege(Privileges.privilege[privilegeIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card className={"mx-1" + (Privileges.privilege[privilegeIndex].revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{privilege.name}</h1>

          <p>{privilege.body}</p>
          {privilege.timing ? <TimingBar timing={privilege.timing}/> : null }


          {revised && privilege.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{privilege.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

