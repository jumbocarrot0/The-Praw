import React, { useEffect, useState } from 'react'
import {
  Container, Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Stations from '../dataFiles/stations.json';
import Phases from '../components/Phases';
import Layout from '../components/Layout'

export default function IndividualStationPage() {

  const { stationIndex } = useParams();

  const [station, setStation] = useState(Stations.stations[stationIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setStation(Stations.stations[stationIndex].original)
    setRevised(false)
  }, [stationIndex])

  return (
    <Layout>
      {Stations.stations[stationIndex].revised ?
        <Nav className="ps-5 mx-5 border-bottom-0" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? "" : " active")} aria-current="page" href="#"
              onClick={() => { setStation(Stations.stations[stationIndex].original); setRevised(false) }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (revised ? " active" : "")} href="#"
              onClick={() => { setStation(Stations.stations[stationIndex].revised); setRevised(true) }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card>
        <CardBody>
          <h1 className='text-light'>{station.name}</h1>
          <p>{station.body}</p>
          <br />
          <p>({station.timing.player}) <Phases phases={station.timing.phases} /></p>


          {revised && station.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{station.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </Layout>
  );
}

