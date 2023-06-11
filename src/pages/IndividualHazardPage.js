import React, { useEffect, useState } from 'react'
import {
  Container, Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Hazards from '../dataFiles/hazards.json';
import Layout from '../components/Layout'


export default function IndividualHazardPage() {

  const { hazardIndex } = useParams();

  const [hazard, setHazard] = useState(Hazards.hazards[hazardIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setHazard(Hazards.hazards[hazardIndex].original)
    setRevised(false)
  }, [hazardIndex])

  return (
    <Layout>
      {Hazards.hazards[hazardIndex].revised ?
        <Nav className="ps-5 mx-5 border-bottom-0" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setHazard(Hazards.hazards[hazardIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setHazard(Hazards.hazards[hazardIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card>
        <CardBody>
          <h1 className='text-light'>{hazard.name}</h1>
          {hazard.type === "AltHazard" ? <p><strong>Offense:</strong>{hazard.body}<br/><br/><strong>Others:</strong>{hazard.body2}</p> :
            <p>{hazard.body}</p>}
            {hazard.type === "Permanent" ? <p><strong>(This Card Remains in Play)</strong></p> :
              hazard.type === "SemiPermanent" ? <p><strong>(Semi-Permanent)</strong></p> : null}
          <br />


          {revised && hazard.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{hazard.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </Layout>
  );
}

