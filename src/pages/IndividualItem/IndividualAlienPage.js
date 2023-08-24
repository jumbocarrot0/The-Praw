import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { Link, useParams } from "react-router-dom"
import Aliens from '../../dataFiles/aliens.json';
import TimingBar from '../../components/TimingBar';
import Layout from '../../components/Layout'

import { createClient } from "@supabase/supabase-js"

async function getAlien(index) {
  const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

  const options = {
    auth: {
      persistSession: false
    }
  }
  const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)

  const { data, error } = await supabase
    .from('Aliens')
    .select('alienData')
    .eq('id', index)
    .eq('viewable', true)

  return data[0].alienData
}

export default function IndividualAlienPage() {

  const { alienIndex } = useParams();

  const [alien, setAlien] = useState(undefined)

  // const [alien, setAlien] = useState(Aliens.aliens[alienIndex].original)
  const [tab, setTab] = useState("original")

  useEffect(() => {
    setTab("original")
    
    getAlien(alienIndex).then((data) => {
      setAlien(data)
    })
  }, [alienIndex])

  if (alien === undefined) {
    return <Layout></Layout>
  } else {
    return (
      <Layout title={alien[tab].name}>
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
            <img alt={alien[tab].name + " Thumbnail"}
              className='float-end'
              // src={require(`../../images/alien icons/avatar_${alien[tab].name.replace('The ', '').replace(' ', '_')}${alien[tab].altTimeline ? '_AT' : ''}.png`)} 
              src={require(`../../images/alien icons/${alien[tab].thumbnail}`)}
            />
            <span><h1 className='text-light d-inline'>{alien[tab].altTimeline ? (alien[tab].name + " (AT)") : alien[tab].name} </h1><h3 className='text-light d-inline'>({alien[tab].alert})</h3></span>
            <h3 className='text-light'>{alien[tab].short}</h3>

            {alien[tab].gameSetup ? <p><strong>Game Setup:</strong> {alien[tab].gameSetup}</p> : null}
            {/* dangerouslySetInnerHTML is, well, dangerous when used on user submitted stuff. But aliens.json is trustworthy, so this is fine albiet jank.
          If/when I add a homebrew aliens option, PLEASE PLEASE PLEASE dont forget to sanitise them. */}
            <p><strong>{alien[tab].powerName}</strong> <span dangerouslySetInnerHTML={
              {
                __html: alien[tab].powerBody
                  .replaceAll('may use this power', '<strong><em>may use</em></strong> this power')
                  .replaceAll('use this power', '<strong><em>use</em></strong> this power')
                  .replaceAll('this power is used', 'this power is <strong><em>used</em></strong>')
              }
            } />
            </p>
            {alien[tab].powerSpecialName ?
              <p><strong>{alien[tab].powerSpecialName}</strong> <span dangerouslySetInnerHTML={
                {
                  __html: alien[tab].powerSpecialBody
                    .replaceAll('may use this power', '<strong><em>may use</em></strong> this power')
                    .replaceAll('use this power', '<strong><em>use</em></strong> this power')
                    .replaceAll('this power is used', 'this power is <strong><em>used</em></strong>')
                }
              } />
              </p>
              : null}
            <br />
            <p><em>{alien[tab].history}</em></p>
            {alien[tab].bans ?
              <p className='fs-3'>Do not use with {
                alien[tab].bans.map((alienID, index) => {
                  return <span ><Link to={`/Aliens/${alienID}`}>{
                    Aliens.aliens[alienID].original.altTimeline ? (Aliens.aliens[alienID].original.name + " (AT)") : Aliens.aliens[alienID].original.name
                  }</Link>{index !== alien[tab].bans.length - 1 ? <span>, or </span> : null}</span>
                })
              }</p>
              : null
            }

            <p></p>
            <TimingBar timing={alien[tab].powerTiming} />
            <br />
            <h3>Wild Flare</h3>
            <p>{alien[tab].wildBody}</p>
            <TimingBar timing={alien[tab].wildTiming} />
            <br />
            <h3>Super Flare</h3>
            <p>{alien[tab].superBody}</p>
            <TimingBar timing={alien[tab].superTiming} />
            <br />
            <br />{
              alien[tab].wildClassicBody ? (
                <div>
                  <h3>Classic Wild Flare</h3>
                  <p>{alien[tab].wildClassicBody}</p>
                  <TimingBar timing={alien[tab].wildClassicTiming} />
                  <br />
                  <h3>Classic Super Flare</h3>
                  <p>{alien[tab].superClassicBody}</p>
                  <TimingBar timing={alien[tab].superClassicTiming} />
                </div>
              ) : null
            }
            {alien[tab].essences ? <div>
              <h3>{alien[tab].name} {alien[tab].essences.name}s</h3>
              <ol>
                {Object.keys(alien[tab].essences.list).sort().map((essenceID => {
                  return <li><strong>{alien[tab].essences.list[essenceID].name}</strong>: {alien[tab].essences.list[essenceID].body}{
                    alien[tab].essences.list[essenceID].value ? <strong className='font-digit fs-4'> {alien[tab].essences.list[essenceID].value}</strong> : null
                  }</li>
                }))}

              </ol>
            </div>
              : null}


            {alien[tab].revisionNotes ? (
              <Card className="bg-light border-warning border-5">
                <CardBody>
                  <p className="text-dark">{alien[tab].revisionNotes}</p>
                </CardBody>
              </Card>
            ) : null}

          </CardBody>
        </Card>
      </Layout>
    );
  }
}

