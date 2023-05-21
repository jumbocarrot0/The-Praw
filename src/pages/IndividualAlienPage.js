import React, { useState } from 'react'
import {
  Container, Card, Row, Col
} from 'reactstrap';
import { useParams, Link } from "react-router-dom"
import Aliens from '../dataFiles/originalAliens.json';
import RevisedAliens from '../dataFiles/revisedAliens.json';
import warpBG from '../images/gridwallpaper.jpg'

function Phases(props) {
  if (props.flare && Object.values(props.phases).reduce((accumulator, phase) => accumulator && phase)) {
    return <span>(Any Phase)</span>
  } else {
    return <span>
      {props.phases.startTurn ? "(Start Turn) " : null}
      {props.phases.regroup ? "(Regroup) " : null}
      {props.phases.destiny ? "(Destiny) " : null}
      {props.phases.launch ? "(Launch) " : null}
      {props.phases.alliance ? "(Alliance) " : null}
      {props.phases.planning ? "(Planning) " : null}
      {props.phases.reveal ? "(Reveal) " : null}
      {props.phases.resolution ? "(Resolution) " : null}
      {props.phases.special ? "(Special) " : null}
      {props.phases.gameSetup ? "(Game Setup) " : null}
      {props.phases.varies ? "(Varies) " : null}
    </span>
  }
}

export default function IndividualAlienPage(props) {

  const { alienIndex } = useParams();

  const [alien, setAlien] = useState(Aliens.aliens[alienIndex])
  const [revised, setRevised] = useState(false)

  if (alien.name === 'Throwback') {
    return (<Container className='throwback'>
      <Row>
        <Col xs={2}>
        </Col>
        <Col xs={8}>
          <table width="100%" cellspacing="2" cellpadding="2" border="1" bgcolor="#800080">
            <tbody>
              <tr>
                <td>
                  <table width="100%" cellspacing="5" cellpadding="5" border="0" bgcolor="#000000">
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
        <Col xs={2}>
        </Col>
      </Row>
    </Container>)
  } else {
    return (
      <Container>
        <ul className="nav nav-tabs ps-5 mx-5">
          <li className="nav-item">
            <Link className={"nav-link" + (revised ? "" : " active")} aria-current="page" to="#"
              onClick={() => { setAlien(Aliens.aliens[alienIndex]); setRevised(false) }}>Original</Link>
          </li>
          <li className="nav-item">
            <Link className={"nav-link" + (revised ? " active" : "")} to="#"
              onClick={() => { setAlien(RevisedAliens.aliens[alienIndex]); setRevised(true) }}>Revised</Link>
          </li>
        </ul>
        <Card>
          <h1>{alien.name}</h1>
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
        </Card>
      </Container>
    );
  }
}

