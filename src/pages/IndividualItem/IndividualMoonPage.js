import React, { useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
import TimingBar from '../../components/TimingBar';

export default function IndividualMoonPage() {

  const moon = useRouteLoaderData("moonIndex")
  const [tab, setTab] = useState("original")

  return (
    <div>
      {moon.revised ?
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
      <Card className={"mx-1" + (moon.revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <span>
            <h1 className='text-light d-inline'>{moon[tab].name}</h1> <h3 className='text-light d-inline'>({moon[tab].type})</h3>
          </span>
          <p>{moon[tab].body}</p>
          <br />
          <TimingBar timing={moon[tab].timing} />


          {moon[tab].revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{moon[tab].revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

