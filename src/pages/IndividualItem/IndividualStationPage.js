import React, { useEffect, useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
import Stations from '../../dataFiles/stations.json';
import TimingBar from '../../components/TimingBar';
import Layout from '../../components/Layout'

export default function IndividualStationPage() {

  const { stationIndex } = useParams();

  const [station, setStation] = useState(Stations.stations[stationIndex].original)
  const [revised, setRevised] = useState(false)

  useEffect(() => {
    setStation(Stations.stations[stationIndex].original)
    setRevised(false)
  }, [stationIndex])

  return (
    <div>
      {Stations.stations[stationIndex].revised ?
        <Nav className="ps-5 mx-1" tabs>
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
      <Card className={"mx-1" + (Stations.stations[stationIndex].revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{station.name}</h1>
          <p>{station.body}</p>
          <br />
          <TimingBar timing={station.timing}/>


          {revised && station.revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{station.revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

