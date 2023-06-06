import React, { useState } from 'react'
import {
  Container, Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Evolutions from '../dataFiles/evolutions.json';
import Phases from '../components/Phases';

export default function IndividualEvolutionPage() {

  const { evolutionIndex } = useParams();

  const [evolution, setEvolution] = useState(Evolutions.evolutions[evolutionIndex].original)
  const [revised, setRevised] = useState(false)

  console.log(Object.entries(evolution.body))

  return (
    <Container>
      {Evolutions.evolutions[evolutionIndex].revised ?
        <Nav className="ps-5 mx-5 border-bottom-0" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setEvolution(Evolutions.evolutions[evolutionIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setEvolution(Evolutions.evolutions[evolutionIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card>
        <CardBody>
          <h1 className='text-light'>{evolution.name}</h1>
          <ul>
            {evolution.body.map((row) => {
              return (row.cost ? <li key={row.cost}>{row.cost}: {row.text}</li> : <p key="noCost">{row.text}</p>)
            })}
          </ul>
          <br />
          <p>({evolution.timing.player}) <Phases phases={evolution.timing.phases} /></p>


          {revised && evolution.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{evolution.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </Container>
  );
}

