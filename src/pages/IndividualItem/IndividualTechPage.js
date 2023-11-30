import React, { useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
// import Techs from '../../dataFiles/technology.json';
import TimingBar from '../../components/TimingBar';

export default function IndividualTechPage() {

  // const { techIndex } = useParams();

  const tech = useRouteLoaderData("techIndex")
  const [tab, setTab] = useState("original")

  return (
    <div>
      {tech.revised ?
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
      <Card className={"mx-1" + (tech.revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <span>
            <h1 className='text-light d-inline'>{tech[tab].name}</h1> <h3 className='text-light d-inline'>({tech[tab].expansion})</h3>
          </span>
          <p><strong>Type: {tech[tab].type}</strong></p>
          {tech[tab].refresh ? <p>When completed, draw another Techs.</p> : null}
          <p><strong>{tech[tab].short}</strong> {tech[tab].body}</p>
          <div style={{ width: (tech[tab].type === "Mili-Tech" ? 75 : 50) + 'px', height: (tech[tab].type === "Mili-Tech" ? 40 : 50) + 'px' }} className={
            tech[tab].type === "Mili-Tech" ? 'border rounded bg-success text-light text-center mb-2 fs-3' : 'border rounded-circle bg-indigo text-light text-center mb-2 fs-2'
          }>
            <strong><p className='font-digit' style={{ paddingTop: 0 + 'px', textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", lineHeight: (tech[tab].type === "Mili-Tech" ? 37 : 45) + "px" }}>{tech[tab].cost}</p></strong>
          </div>
          <TimingBar timing={tech[tab].timing} />


          {tech[tab].revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{tech[tab].revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

