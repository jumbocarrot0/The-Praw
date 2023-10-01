import React, { useEffect, useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Wrenches from '../../../dataFiles/wrenches.json';

export default function IndividualWrenchPage() {

  const { wrenchIndex } = useParams();

  const [wrench, setWrench] = useState(Wrenches.wrench[wrenchIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setWrench(Wrenches.wrench[wrenchIndex].original)
    setRevised(false)
  }, [wrenchIndex])

  return (
    <div>
      {Wrenches.wrench[wrenchIndex].revised ?
        <Nav className="ps-5 mx-1" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setWrench(Wrenches.wrench[wrenchIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setWrench(Wrenches.wrench[wrenchIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card className={"mx-1" + (Wrenches.wrench[wrenchIndex].revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{wrench.name}</h1>

          <p>{wrench.body}</p>
          <br />


          {revised && wrench.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{wrench.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

