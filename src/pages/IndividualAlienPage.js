import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams, Link } from "react-router-dom"
import Aliens from '../dataFiles/aliens.json';
import TimingBar from '../components/TimingBar';
import Layout from '../components/Layout'

export default function IndividualAlienPage() {

  const { alienIndex } = useParams();

  const [alien, setAlien] = useState(Aliens.aliens[alienIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setAlien(Aliens.aliens[alienIndex].original)
    setRevised(false)
  }, [alienIndex])

  return (
    <Layout title={alien.name}>
      {Aliens.aliens[alienIndex].revised ?
        <Nav className="ps-5 mx-1" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setAlien(Aliens.aliens[alienIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setAlien(Aliens.aliens[alienIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card className="mx-1 border-top-0 rounded-top-0">
        <CardBody>
          <img alt={alien.name + " Avatar"} 
          className='float-end'
          src={require(`../images/alien icons/avatar_${alien.name.replace('The ', '').replace(' ', '_')}${alien.altTimeline ? '_AT' : ''}.png`)} />
          <h1 className='text-light'>{alien.name}</h1>
          <h3>{alien.alert}</h3>
          {alien.gameSetup ? <p><strong>Game Setup:</strong> {alien.gameSetup}</p> : null}
          <p><strong>{alien.powerName}</strong> {alien.powerBody}</p>
          {alien.powerSpecialName ? <p><strong>{alien.powerSpecialName}</strong> {alien.powerSpecialBody}</p> : null}
          <br />
          <p><em>{alien.history}</em></p>
          <TimingBar timing={alien.powerTiming} />
          <br />
          <h3>Wild Flare</h3>
          <p>{alien.wildBody}</p>
          <TimingBar timing={alien.wildTiming} />
          <br />
          <h3>Super Flare</h3>
          <p>{alien.superBody}</p>
          <TimingBar timing={alien.superTiming} />
          <br />
          <br />{
            alien.wildClassicBody ? (
              <div>
                <h3>Classic Wild Flare</h3>
                <p>{alien.wildClassicBody}</p>
                <TimingBar timing={alien.wildClassicTiming} />
                <br />
                <h3>Classic Super Flare</h3>
                <p>{alien.superClassicBody}</p>
                <TimingBar timing={alien.superClassicTiming} />
              </div>
            ) : null
          }


          {revised && alien.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{alien.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </Layout>
  );
}

