import React, { useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
import TimingBar from '../../components/TimingBar';

export default function IndividualLuxPage() {

  const lux = useRouteLoaderData("luxIndex")
  const [tab, setTab] = useState("original")

  return (
    <div>
      {lux.revised ?
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
      <Card className={"mx-1" + (lux.revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{lux[tab].name}</h1>
          <p>{lux[tab].body}</p>
          <br />
          <TimingBar timing={lux[tab].timing}/>


          {lux[tab].revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{lux[tab].revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

