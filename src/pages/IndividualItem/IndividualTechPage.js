import React, { useEffect, useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Techs from '../../dataFiles/technology.json';
import TimingBar from '../../components/TimingBar';
import Layout from '../../components/Layout'

export default function IndividualTechPage() {

  const { techIndex } = useParams();

  const [tech, setTech] = useState(Techs.technologies[techIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setTech(Techs.technologies[techIndex].original)
    setRevised(false)
  }, [techIndex])

  return (
    <Layout title={tech.name}>
      {Techs.technologies[techIndex].revised ?
        <Nav className="ps-5 mx-1" tabs>
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
      <Card className={"mx-1" + (Techs.technologies[techIndex].revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{tech.name}</h1>
          <p><strong>Type: {tech.type}</strong></p>
          {tech.refresh ? <p>When completed, draw another Techs.</p> : null}
          <p><strong>{tech.short}</strong> {tech.body}</p>
          <div style={{ width: (tech.type === "Mili-Tech" ? 75 : 50) + 'px', height: (tech.type === "Mili-Tech" ? 40 : 50) + 'px' }} className={
            tech.type === "Mili-Tech" ? 'border rounded bg-success text-light text-center mb-2 fs-3' : 'border rounded-circle bg-indigo text-light text-center mb-2 fs-2'
          }>
            <strong><p className='font-digit' style={{ paddingTop: 0 + 'px', textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", lineHeight: (tech.type === "Mili-Tech" ? 37 : 45) + "px" }}>{tech.cost}</p></strong>
          </div>
          <TimingBar timing={tech.timing}/>


          {revised && tech.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{tech.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </Layout>
  );
}

