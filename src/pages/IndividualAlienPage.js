import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
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
          <span><h1 className='text-light d-inline'>{alien.name} </h1><h3 className='text-light d-inline'>({alien.alert})</h3></span>
          <h3 className='text-light'>{alien.short}</h3>
          
          {alien.gameSetup ? <p><strong>Game Setup:</strong> {alien.gameSetup}</p> : null}
          {/* dangerouslySetInnerHTML is, well, dangerous when used on user submitted stuff. But aliens.json is trustworthy, so this is fine albiet jank.
          If/when I add a homebrew aliens option, PLEASE PLEASE PLEASE dont forget to sanitise them. */}
          <p><strong>{alien.powerName}</strong> <span dangerouslySetInnerHTML={
            {
              __html: alien.powerBody
                .replaceAll('may use this power', '<strong><em>may use</em></strong> this power')
                .replaceAll('use this power', '<strong><em>use</em></strong> this power')
                .replaceAll('this power is used', 'this power is <strong><em>used</em></strong>')
            }
          } />
          </p>
          {alien.powerSpecialName ?
            <p><strong>{alien.powerSpecialName}</strong> <span dangerouslySetInnerHTML={
              {
                __html: alien.powerSpecialBody
                  .replaceAll('may use this power', '<strong><em>may use</em></strong> this power')
                  .replaceAll('use this power', '<strong><em>use</em></strong> this power')
                  .replaceAll('this power is used', 'this power is <strong><em>used</em></strong>')
              }
            } />
            </p>
            : null}
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

