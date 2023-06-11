import React, { useEffect, useState } from 'react'
import {
  Container, Card, CardBody, Row, Col, CardHeader, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams, Link } from "react-router-dom"
import Aliens from '../dataFiles/aliens.json';
import Phases from '../components/Phases';
import Layout from '../components/Layout'

export default function IndividualAlienPage() {

  const { alienIndex } = useParams();

  const [alien, setAlien] = useState(Aliens.aliens[alienIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setAlien(Aliens.aliens[alienIndex].original)
    setRevised(false)
  }, [alienIndex])

  if (alien.name === 'Throwback') { 
    return (<Layout className='throwback'>
      <Row>
        <Col md={2}>
        </Col>
        <Col md={8}>
          <table width="100%" cellspacing="2" cellpadding="2" border="1" bgcolor="#800080">
            <tbody>
              <tr>
                <td>
                  <table width="100%" cellspacing="5" cellpadding="10" border="0" bgcolor="#000000">
                    <tbody>
                      <tr>
                        <td>
                          <b>{alien.name.toUpperCase()}</b> [FFG:CO] {alien.short.toUpperCase()} <Link href="#">Fantasy Flight</Link>
                          <p><strong>{alien.powerName}</strong> {alien.powerBody}</p>
                          <p>
                            <strong>History:</strong> {alien.history}
                          </p>
                          <p>
                            <strong>Notes:</strong> The recommended experience level for this power is <strong>Expert</strong>. This is a <strong>Resource</strong> type power.
                          </p>
                          <p>
                            <strong>Wild:</strong> {alien.wildBody}
                          </p>
                          <p>
                            <strong>Super:</strong> {alien.superBody}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col md={2}>
        </Col>
      </Row>
    </Layout>)
  } else {
    return (
      <Layout>
        {Aliens.aliens[alienIndex].revised ?
          <Nav className="ps-5 mx-5 border-bottom-0" tabs>
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
        <Card>
          <CardBody>
            <h1 className='text-light'>{alien.name}</h1>
            <h3>{alien.alert}</h3>
            {alien.gameSetup ? <p><strong>Game Setup:</strong> {alien.gameSetup}</p> : null}
            <p><strong>{alien.powerName}</strong> {alien.powerBody}</p>
            {alien.powerSpecialName ? <p><strong>{alien.powerSpecialName}</strong> {alien.powerSpecialBody}</p> : null}
            <br />
            <p><em>{alien.history}</em></p>
            <p>({alien.powerTiming.player}) ({alien.powerTiming.choice}) <Phases phases={alien.powerTiming.phases} /></p>
            <br />
            <h3>Wild Flare</h3>
            <p>{alien.wildBody}</p>
            <p>({alien.wildTiming.player}) <Phases phases={alien.wildTiming.phases} flare /></p>
            <br />
            <h3>Super Flare</h3>
            <p>{alien.superBody}</p>
            <p>({alien.superTiming.player}) <Phases phases={alien.superTiming.phases} flare /></p>
            <br />
            <br />{
              alien.wildClassicBody ? (
                <div>
                  <h3>Classic Wild Flare</h3>
                  <p>{alien.wildClassicBody}</p>
                  <p>({alien.wildClassicTiming.player}) <Phases phases={alien.wildClassicTiming.phases} flare /></p>
                  <br />
                  <h3>Classic Super Flare</h3>
                  <p>{alien.superClassicBody}</p>
                  <p>({alien.superClassicTiming.player}) <Phases phases={alien.superClassicTiming.phases} flare /></p>
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
}

