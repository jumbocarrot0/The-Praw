import React, { useState } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import TimingBar from '../../components/TimingBar';
import { Link } from 'react-router-dom';
import { useRouteLoaderData } from "react-router-dom"


export default function IndividualSpecialShipPage() {

  const specialShip = useRouteLoaderData("specialShipIndex")
  const [tab, setTab] = useState("original")

  return (
    <div >
      {specialShip.revised || specialShip.homebrew ?
        <Nav className="ps-5 mx-1" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (tab === "original" ? " active" : "")} aria-current="page" href="#"
              onClick={() => { setTab("original") }}>Original</NavLink>
          </NavItem>
          {specialShip.revised ?
            <NavItem>
              <NavLink className={"nav-link" + (tab === "revised" ? " active" : "")} href="#"
                onClick={() => { setTab("revised") }}>Revised</NavLink>
            </NavItem> : null
          }
          {specialShip.homebrew ?
            <NavItem>
              <NavLink className={"nav-link" + (tab === "homebrew" ? " active" : "")} href="#"
                onClick={() => { setTab("homebrew") }}>House Rules</NavLink>
            </NavItem> : null
          }
        </Nav> : null
      }
      <Card className={"mx-1" + (specialShip.revised || specialShip.homebrew ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>

          <div>
            <span>
              <h1 className='text-light d-inline'>{specialShip[tab].name}</h1> <h3 className='text-light d-inline'>({specialShip[tab].expansion})</h3>
            </span>
            {specialShip.designers.length !== 0 ?
              specialShip.source ?
                <Link to={specialShip.source}><p>Designed by {
                  specialShip.designers.map((designer, index) => {
                    // console.log(bannedAlien)
                    return <span key={index}>{
                      designer
                    }{index !== specialShip.designers.length - 1 ? <span>, and </span> : null}</span>
                  })
                }
                </p>
                </Link>
                : <p>Designed by {
                  specialShip.designers.map((designer, index) => {
                    // console.log(bannedAlien)
                    return <span key={index}>{
                      designer
                    }{index !== specialShip.designers.length - 1 ? <span>, and </span> : null}</span>
                  })
                }
                </p>
              : null
            }

            {specialShip[tab].gameSetup ? <p><strong>Game Setup:</strong> {specialShip[tab].gameSetup}</p> : null}
            {/* dangerouslySetInnerHTML is, well, dangerous when used on user submitted stuff. But aliens.json is trustworthy, so this is fine albiet jank.
  If/when I add a homebrew aliens option, PLEASE PLEASE PLEASE dont forget to sanitise them. */}
            <p><strong>Passive:</strong> {specialShip[tab].powerBody}</p>
            <TimingBar timing={specialShip[tab].powerTiming} />
            <p><strong>{specialShip[tab].specialName}:</strong> {specialShip[tab].specialBody}</p>
            <TimingBar timing={specialShip[tab].specialTiming} />

            {specialShip[tab].revisionNotes ? (
              <Card className="bg-light border-warning border-5">
                <CardBody>
                  <p className="text-dark">{specialShip[tab].revisionNotes}</p>
                </CardBody>
              </Card>
            ) : null}
          </div>

        </CardBody>
      </Card>
    </div>
  );
}

