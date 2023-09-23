import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useParams } from "react-router-dom"
// import TimingBar from '../../components/TimingBar';
import Layout from '../../components/Layout'
import Alien from '../../components/Alien'
import Loading from '../../components/Loading'

import { getAlien } from "../../supabaseAPI/getAlien"


export default function IndividualAlienPage() {

  const { alienIndex } = useParams();

  const [alien, setAlien] = useState(undefined)
  // const [alienBans, setAlienBans] = useState({})

  // const [alien, setAlien] = useState(Aliens.aliens[alienIndex].original)
  const [tab, setTab] = useState("original")

  useEffect(() => {
    setTab("original")

    getAlien(alienIndex)
      .then((data) => {
        setAlien(data)
      })
  }, [alienIndex])

  // useEffect(() => {
  //   setAlienBans({})
  //   if (alien && alien[tab].bans) {
  //     alien[tab].bans.forEach((ban) => {
  //       getAlien(ban)
  //         .then((data) => {
  //           const newBans = alienBans
  //           newBans[ban] = data
  //           setAlienBans(newBans)
  //         })
  //     })
  //   }
  // }, [alien, tab])

  // console.log("bans", alienBans)

  if (alien === undefined) {
    return <div>
      <Loading/>
    </div>
  } else {
    return (
      <div>
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
      </div>
    );
  }
}

