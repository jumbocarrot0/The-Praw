import React, { useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
import TimingBar from "../../../components/TimingBar"

export default function IndividualPrivilegePage() {

  // const { privilegeIndex } = useParams();

  const privilege = useRouteLoaderData("privilegeIndex")
  const [tab, setTab] = useState("original")

  // useEffect(() => {
  //   setPrivilege(Privileges.privilege[privilegeIndex].original)
  //   setRevised(false)
  // }, [privilegeIndex])

  return (
    <div>
      {privilege.revised ?
        <Nav className="ps-5 mx-1" tabs>
        <NavItem>
          <NavLink className={"nav-link" + (tab === "original" ? " active" : "")} aria-current="page" href="#"
            onClick={() => { setTab("original") }}>Original</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={"nav-link" + (tab === "revised" ? " active" : "")} href="#"
            onClick={() => { setTab("revised") }}>Revised</NavLink>
        </NavItem>
        </Nav> : null
      }
      <Card className={"mx-1" + (privilege[tab].revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{privilege[tab].name}</h1>

          <p>{privilege[tab].body}</p>
          {privilege[tab].timing ? <TimingBar timing={privilege[tab].timing}/> : null }


          {privilege[tab].revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{privilege[tab].revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

