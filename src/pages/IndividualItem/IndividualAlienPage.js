import React, { useState } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { Await, useRouteLoaderData } from "react-router-dom"
// import TimingBar from '../../components/TimingBar';
import Alien from '../../components/Alien'
import Loading from '../../components/Loading'

const VERSIONS = {
  "original": "Original",
  "revised": "Revised",
  "homebrew": "House Rules"
}

const MODES = {
    "PLAIN": 0,
    "REVISION_EXPLAINATION": 1
}

export default function IndividualAlienPage() {

  const alien = useRouteLoaderData("alienIndex")
  const [tab, setTab] = useState("original")

  const [viewMode, setViewMode] = useState(MODES.REVISION_EXPLAINATION)

  return (
    <React.Suspense fallback={<Loading />}>
      <Await
        resolve={alien.alien}
        errorElement={
          <p>Error loading alien!</p>
        }
      >
        {(alien) => (
          <>
              <Nav className="ps-5 mx-1" tabs>

                {
                  alien.versions.map(version => 
                    <NavItem key={version}>
                      <NavLink className={"nav-link" + (tab === version ? " active" : "")} aria-current="page" href="#"
                        onClick={() => { setTab(version) }}>{VERSIONS[version]}</NavLink>
                    </NavItem>)
                }
                {/* <NavItem>
                  <NavLink className={"nav-link" + (tab === "original" ? " active" : "")} aria-current="page" href="#"
                    onClick={() => { setTab("original") }}>Original</NavLink>
                </NavItem>
                {alien.revised ?
                  <NavItem>
                    <NavLink className={"nav-link" + (tab === "revised" ? " active" : "")} href="#"
                      onClick={() => { setTab("revised") }}>Revised</NavLink>
                  </NavItem> : null
                }
                {alien.homebrew ?
                  <NavItem>
                    <NavLink className={"nav-link" + (tab === "homebrew" ? " active" : "")} href="#"
                      onClick={() => { setTab("homebrew") }}>House Rules</NavLink>
                  </NavItem> : null
                } */}
              </Nav>
            <Card className={"mx-1 border-top-0 rounded-top-0"}>
              <CardBody>
                <Alien alien={alien} tab={tab} viewMode={viewMode} />
              </CardBody>
            </Card>
          </>
        )}
      </Await>
    </React.Suspense>
  );
}

