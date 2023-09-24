import React, { useEffect, useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Hazards from '../../dataFiles/hazards.json';

export default function IndividualHazardPage() {

  const { hazardIndex } = useParams();

  const [hazard, setHazard] = useState(Hazards.hazards[hazardIndex].original)
  const [tab, setTab] = useState("original")

  useEffect(() => {
    setHazard(Hazards.hazards[hazardIndex].original)
    setTab("original")
  }, [hazardIndex])

  return (
    <div>
    {Hazards.hazards[hazardIndex].revised || Hazards.hazards[hazardIndex].homebrew ?
      <Nav className="ps-5 mx-1" tabs>
        <NavItem>
          <NavLink className={"nav-link" + (tab === "original" ? " active" : "")} aria-current="page" href="#"
            onClick={() => { setHazard(Hazards.hazards[hazardIndex].original); setTab("original") }}>Original</NavLink>
        </NavItem>
        {Hazards.hazards[hazardIndex].revised ?
          <NavItem>
            <NavLink className={"nav-link" + (tab === "revised" ? " active" : "")} href="#"
              onClick={() => { setHazard(Hazards.hazards[hazardIndex].revised); setTab("revised") }}>Revised</NavLink>
          </NavItem> : null
        }
        {Hazards.hazards[hazardIndex].homebrew ?
          <NavItem>
            <NavLink className={"nav-link" + (tab === "homebrew" ? " active" : "")} href="#"
              onClick={() => { setHazard(Hazards.hazards[hazardIndex].homebrew); setTab("homebrew") }}>House Rules</NavLink>
          </NavItem> : null
        }
      </Nav> : null
    }
      <Card className={"mx-1" + (Hazards.hazards[hazardIndex].revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{hazard.name}</h1>
          {hazard.type === "AltHazard" ? <p><strong>Offense: </strong>{hazard.body}<br/><br/><strong>Others: </strong>{hazard.body2}</p> :
            <p>{hazard.body}</p>}
            {hazard.type === "Permanent" ? <p><strong className='text-danger'>
            (
            <span className='text-decoration-underline'>
                <span className="text-light">This Card Remains in Play</span>
            </span>
            )
        </strong></p> :
              hazard.type === "SemiPermanent" ? <p><strong className='text-warning'>
              (
              <span className='text-decoration-underline'>
                  <span className="text-light">Semi-Permanent</span>
              </span>
              )
          </strong></p> : null}
          <br />


          {hazard.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{hazard.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

