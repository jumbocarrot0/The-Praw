import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { Await, useParams, useRouteLoaderData } from "react-router-dom"
// import TimingBar from '../../components/TimingBar';
import Alien from '../../components/Alien'
import Loading from '../../components/Loading'

import { getAlien } from "../../supabaseAPI/getAlien"


export default function IndividualAlienPage() {

  const { alienIndex } = useParams();
  const [loading, setLoading] = useState(false)

  const alien = useRouteLoaderData("alienIndex")

  // const [alien, setAlien] = useState(undefined)
  // // const [alienBans, setAlienBans] = useState({})

  // // const [alien, setAlien] = useState(Aliens.aliens[alienIndex].original)
  const [tab, setTab] = useState("original")

  // useEffect(() => {
  //   setTab("original")

  //   getAlien(alienIndex)
  //     .then((data) => {
  //       setAlien(data)
  //     })
  // }, [alienIndex])

  if (loading) {
    return <div>
      <Loading />
    </div>
  } else {
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
              {alien.revised || alien.homebrew ?
                <Nav className="ps-5 mx-1" tabs>
                  <NavItem>
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
                  }
                </Nav> : null
              }
              <Card className={"mx-1" + (alien.revised || alien.homebrew ? " border-top-0 rounded-top-0" : "")}>
                <CardBody>

                  <Alien alien={alien} tab={tab} />

                </CardBody>
              </Card>
            </>
          )}
        </Await>
      </React.Suspense>
    );
  }
}

