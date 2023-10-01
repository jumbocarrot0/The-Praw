import React, { useEffect, useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Ages from '../../../dataFiles/ages.json';

export default function IndividualMasterPage() {

  const { masterIndex } = useParams();

  const [master, setMaster] = useState(Ages.master[masterIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setMaster(Ages.master[masterIndex].original)
    setRevised(false)
  }, [masterIndex])

  return (
    <div>
      {Ages.master[masterIndex].revised ?
        <Nav className="ps-5 mx-1" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setMaster(Ages.master[masterIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setMaster(Ages.master[masterIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card className={"mx-1" + (Ages.master[masterIndex].revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{master.name}</h1>

          <p>{master.body}</p>
          <br />


          {revised && master.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{master.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

