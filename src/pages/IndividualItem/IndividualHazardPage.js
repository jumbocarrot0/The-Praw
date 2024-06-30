import React, { useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"

export default function IndividualHazardPage() {

  const hazard = useRouteLoaderData("hazardIndex")
  const [tab, setTab] = useState("original")

  return (
    <div>
      {hazard.revised || hazard.homebrew ?
        <Nav className="ps-5 mx-1" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (tab === "original" ? " active" : "")} aria-current="page" href="#"
              onClick={() => { setTab("original") }}>Original</NavLink>
          </NavItem>
          {hazard.revised ?
            <NavItem>
              <NavLink className={"nav-link" + (tab === "revised" ? " active" : "")} href="#"
                onClick={() => { setTab("revised") }}>Revised</NavLink>
            </NavItem> : null
          }
          {hazard.homebrew ?
            <NavItem>
              <NavLink className={"nav-link" + (tab === "homebrew" ? " active" : "")} href="#"
                onClick={() => { setTab("homebrew") }}>House Rules</NavLink>
            </NavItem> : null
          }
        </Nav> : null
      }
      <Card className={"mx-1" + (hazard.revised || hazard.homebrew ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <span>
            <h1 className='text-light d-inline'>{hazard[tab].name}</h1> <h3 className='text-light d-inline'>({hazard[tab].expansion})</h3>
          </span>
          {hazard[tab].type === "AltHazard" ? <p><strong>Offense: </strong>{hazard[tab].body}<br /><br /><strong>Others: </strong>{hazard[tab].body2}</p> :
            <p>{hazard[tab].body}</p>}
          {hazard[tab].type === "Permanent" ? <p><strong className='text-danger'>
            (
            <span className='text-decoration-underline'>
              <span className="text-light">This Card Remains in Play</span>
            </span>
            )
          </strong></p> :
            hazard[tab].type === "SemiPermanent" ? <p><strong className='text-warning'>
              (
              <span className='text-decoration-underline'>
                <span className="text-light">Semi-Permanent</span>
              </span>
              )
            </strong></p> : <></>}
          <br />


          {hazard[tab].revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{hazard[tab].revisionNotes}</p>
              </CardBody>
            </Card>
          ) : <></>}

        </CardBody>
      </Card>
    </div>
  );
}

