import React, { useState } from 'react'
import {
  Container, Card, CardBody, Row, Col, CardHeader, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams, Link } from "react-router-dom"
import Hazards from '../dataFiles/hazard.json';

export default function IndividualHazardPage(props) {

  const { hazardIndex } = useParams();

  const [hazard, setHazard] = useState(Hazards.hazards[hazardIndex].original)
  const [revised, setRevised] = useState(false)

  return (
    <Container>
      {Hazards.technologies[hazardIndex].revised ?
        <Nav className="ps-5 mx-5 border-bottom-0" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setHazard(Hazards.technologies[hazardIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setHazard(Hazards.technologies[hazardIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card>
        <CardBody>
          <h1 className='text-light'>{hazard.name}</h1>
          <p>{hazard.body}</p>
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
    </Container>
  );
}

