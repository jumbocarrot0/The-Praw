import React, { useState } from 'react'
import {
  Container, Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Lux from '../dataFiles/lux.json';
import Phases from '../components/Phases';

export default function IndividualLuxPage() {

  const { luxIndex } = useParams();

  const [lux, setLux] = useState(Lux.lux[luxIndex].original)
  const [revised, setRevised] = useState(false)

  return (
    <Container>
      {Lux.lux[luxIndex].revised ?
        <Nav className="ps-5 mx-5 border-bottom-0" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setLux(Lux.lux[luxIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setLux(Lux.lux[luxIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card>
        <CardBody>
          <h1 className='text-light'>{lux.name}</h1>
          <p>{lux.body}</p>
          <br />
          <p>({lux.timing.player}) <Phases phases={lux.timing.phases} /></p>


          {revised && lux.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{lux.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </Container>
  );
}

