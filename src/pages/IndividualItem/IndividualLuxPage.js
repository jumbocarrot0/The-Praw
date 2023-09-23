import React, { useEffect, useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Lux from '../../dataFiles/lux.json';
import TimingBar from '../../components/TimingBar';
import Layout from '../../components/Layout'

export default function IndividualLuxPage() {

  const { luxIndex } = useParams();

  const [lux, setLux] = useState(Lux.lux[luxIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setLux(Lux.lux[luxIndex].original)
    setRevised(false)
  }, [luxIndex])

  return (
    <div>
      {Lux.lux[luxIndex].revised ?
        <Nav className="ps-5 mx-1" tabs>
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
      <Card className={"mx-1" + (Lux.lux[luxIndex].revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{lux.name}</h1>
          <p>{lux.body}</p>
          <br />
          <TimingBar timing={lux.timing}/>


          {revised && lux.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{lux.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

