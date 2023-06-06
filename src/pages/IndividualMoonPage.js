import React, { useState } from 'react'
import {
  Container, Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Moons from '../dataFiles/moons.json';
import Phases from '../components/Phases';
import Layout from '../components/Layout'

export default function IndividualMoonPage() {

  const { moonIndex } = useParams();

  const [moon, setMoon] = useState(Moons.moons[moonIndex].original)
  const [revised, setRevised] = useState(false)

  return (
    <Layout>
      {Moons.moons[moonIndex].revised ?
        <Nav className="ps-5 mx-5 border-bottom-0" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setMoon(Moons.moons[moonIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setMoon(Moons.moons[moonIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card>
        <CardBody>
          <h1 className='text-light'>{moon.name}</h1>
          <p>{moon.body}</p>
          <br />
          <p>({moon.timing.player}) <Phases phases={moon.timing.phases} /></p>


          {revised && moon.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{moon.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </Layout>
  );
}

