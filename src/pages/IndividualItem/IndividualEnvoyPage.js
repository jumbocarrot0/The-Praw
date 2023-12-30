import React, { useState } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
import TimingBar from '../../components/TimingBar';


export default function IndividualEnvoyPage() {

  const envoy = useRouteLoaderData("envoyIndex")
  const [tab, setTab] = useState("original")

  return (
    <div >
      {envoy.revised || envoy.homebrew ?
        <Nav className="ps-5 mx-1" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (tab === "original" ? " active" : "")} aria-current="page" href="#"
              onClick={() => { setTab("original") }}>Original</NavLink>
          </NavItem>
          {envoy.revised ?
            <NavItem>
              <NavLink className={"nav-link" + (tab === "revised" ? " active" : "")} href="#"
                onClick={() => { setTab("revised") }}>Revised</NavLink>
            </NavItem> : null
          }
          {envoy.homebrew ?
            <NavItem>
              <NavLink className={"nav-link" + (tab === "homebrew" ? " active" : "")} href="#"
                onClick={() => { setTab("homebrew") }}>House Rules</NavLink>
            </NavItem> : null
          }
        </Nav> : null
      }
      <Card className={"mx-1" + (envoy.revised || envoy.homebrew ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>

          <div>
            <img alt={envoy[tab].name + " Thumbnail"}
              className='float-end'
              src={require(`../../images/${envoy[tab].thumbnail}`)}
            />
            <h1 className='text-light'>{envoy[tab].name}</h1>

            {envoy[tab].gameSetup ? <p><strong>Game Setup:</strong> {envoy[tab].gameSetup}</p> : null}
            {/* dangerouslySetInnerHTML is, well, dangerous when used on user submitted stuff. But aliens.json is trustworthy, so this is fine albiet jank.
  If/when I add a homebrew aliens option, PLEASE PLEASE PLEASE dont forget to sanitise them. */}
            <p><span dangerouslySetInnerHTML={
              {
                __html: envoy[tab].powerBody
                  .replaceAll('may use this power', '<strong><em>may use</em></strong> this power')
                  .replaceAll('use this power', '<strong><em>use</em></strong> this power')
                  .replaceAll('this power is used', 'this power is <strong><em>used</em></strong>')
              }
            } />
            </p>
            <p><em>{envoy[tab].history}</em></p>

            <p></p>
            <TimingBar timing={envoy[tab].powerTiming} />

            {envoy[tab].revisionNotes ? (
              <Card className="bg-light border-warning border-5">
                <CardBody>
                  <p className="text-dark">{envoy[tab].revisionNotes}</p>
                </CardBody>
              </Card>
            ) : null}
          </div>

        </CardBody>
      </Card>
    </div>
  );
}

