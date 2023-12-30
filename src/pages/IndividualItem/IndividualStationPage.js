import React, { useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
import TimingBar from '../../components/TimingBar';

export default function IndividualStationPage() {

  const station = useRouteLoaderData("stationIndex")
  const [tab, setTab] = useState("original")

  return (
    <div>
      {station.revised ?
        <Nav className="ps-5 mx-1" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (tab === "original" ? " active" : "")} aria-current="page" href="#"
              onClick={() => { setTab("original") }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (tab === "revised" ? " active" : "")} href="#"
              onClick={() => { setTab("revised") }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card className={"mx-1" + (station.revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          {station[tab].thumbnail ? <img alt={station[tab].name + " Thumbnail"}
            className='float-end'
            src={require(`../../images/${station[tab].thumbnail}`)}
          /> : null}

          <span>
            <h1 className='text-light d-inline'>{station[tab].name}</h1> <h3 className='text-light d-inline'>({station[tab].expansion})</h3>
          </span>
          <h3 className='text-light'>{station[tab].type}</h3>
          <p>{station[tab].body}</p>
          <br />
          <TimingBar timing={station[tab].timing} />


          {station[tab].revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{station[tab].revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

