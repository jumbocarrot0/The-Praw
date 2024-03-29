import React, { useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
import TimingBar from '../../components/TimingBar';

export default function IndividualEvolutionPage() {

  const evolution = useRouteLoaderData("evolutionIndex")
  const [tab, setTab] = useState("original")

  return (
    <div>
      {evolution.revised ?
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
      <Card className={"mx-1" + (evolution.revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{evolution[tab].name}</h1>
          <ul>
            {evolution[tab].body.map((row) => {
              return (row.cost ? <li key={row.cost}>{row.cost}: {row.text}</li> : <p key="noCost">{row.text}</p>)
            })}
          </ul>
          <br />
          <TimingBar timing={evolution[tab].timing}/>


          {evolution[tab].revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{evolution[tab].revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

