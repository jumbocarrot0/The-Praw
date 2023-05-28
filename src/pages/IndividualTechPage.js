import React, { useState } from 'react'
import {
  Container, Card, CardBody, Row, Col, CardHeader, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams, Link } from "react-router-dom"
import Techs from '../dataFiles/technology.json';

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

export default function IndividualTechPage(props) {

  const { techIndex } = useParams();

  const [tech, setTech] = useState(Techs.technologies[techIndex].original)
  const [revised, setRevised] = useState(false)

  return (
    <Container>
      {Techs.technologies[techIndex].original !== Techs.technologies[techIndex].revised ?
        <Nav className="ps-5 mx-5 border-bottom-0" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setTech(Techs.technologies[techIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setTech(Techs.technologies[techIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card>
        <CardBody>
          <h1 className='text-light'>{tech.name}</h1>
          {tech.refresh ? <p>When completed, draw another Techs.</p> : null}
          <p><strong>{tech.short}</strong> {tech.body}</p>
          <br />
          <p>({tech.timing.player}) <Phases phases={tech.timing.phases} /></p>


          {revised && tech.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{tech.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </Container>
  );
}

