import React, { useEffect, useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Objectives from '../../dataFiles/objectives.json';
import Layout from '../../components/Layout'


export default function IndividualObjectivePage() {

  const { objectiveIndex } = useParams();

  const [objective, setObjective] = useState(Objectives.objectives[objectiveIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setObjective(Objectives.objectives[objectiveIndex].original)
    setRevised(false)
  }, [objectiveIndex])

  return (
    <Layout title={objective.name}>
      {Objectives.objectives[objectiveIndex].revised ?
        <Nav className="ps-5 mx-1" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setObjective(Objectives.objectives[objectiveIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setObjective(Objectives.objectives[objectiveIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card className={"mx-1" + (Objectives.objectives[objectiveIndex].revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{objective.name}</h1>

          <p>{objective.body}</p>
          <p><strong>{objective.points}</strong></p>
          <br />


          {revised && objective.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{objective.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </Layout>
  );
}

