import React, { useEffect, useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Evolutions from '../../dataFiles/evolutions.json';
import TimingBar from '../../components/TimingBar';

export default function IndividualEvolutionPage() {

  const { evolutionIndex } = useParams();

  const [evolution, setEvolution] = useState(Evolutions.evolutions[evolutionIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setEvolution(Evolutions.evolutions[evolutionIndex].original)
    setRevised(false)
  }, [evolutionIndex])

  console.log(Object.entries(evolution.body))

  return (
    <div>
      {Evolutions.evolutions[evolutionIndex].revised ?
        <Nav className="ps-5 mx-1" tabs>
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
      <Card className={"mx-1" + (Evolutions.evolutions[evolutionIndex].revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{evolution.name}</h1>
          <ul>
            {evolution.body.map((row) => {
              return (row.cost ? <li key={row.cost}>{row.cost}: {row.text}</li> : <p key="noCost">{row.text}</p>)
            })}
          </ul>
          <br />
          <TimingBar timing={evolution.timing}/>


          {revised && evolution.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{evolution.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

