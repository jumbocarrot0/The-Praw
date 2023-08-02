import { Helmet } from "react-helmet";
import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink, Form, FormGroup, Button,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Col,
  Row,
  Badge
} from 'reactstrap';
import { Link } from "react-router-dom"
// import TimingBar from '../components/TimingBar';
import Layout from '../components/Layout'
import Aliens from '../dataFiles/aliens.json'

import { createClient } from '@supabase/supabase-js'

function DynamicFormGroup(props) {
  return (
    <FormGroup row>
      <Label className="text-dark" for={props.id} sm={2}>
        {props.children}
      </Label>
      <Col sm={10}>
        <Input
          id={props.id}
          className='d-inline'
          value={props.option[0]}
          type={props.textarea ? "textarea" : "text"}
          onChange={(e) => {
            if (!/[^ A-Za-zÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\d\-,'\/+\\,:.!?()]/.test(e.target.value)) {
              props.option[1](e.target.value)
            }
          }}>
        </Input>
      </Col>
    </FormGroup>
  )
}

async function uploadAlien(alien) {
  const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"
  const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY)

  const { error } = await supabase
    .from('HomebrewAlienSubmissions')
    .insert({ alienData: alien })

  console.log(error)

}


function sortAliens(aliens) {
  aliens = Object.entries(aliens)
  // console.log('unsorted: ', aliens)
  aliens.sort(function (a, b) {
    const expansions = ["Base Set", "Cosmic Incursion", "Cosmic Conflict", "Cosmic Alliance", "Cosmic Storm", "Cosmic Dominion", "Cosmic Eons", "42nd Anniversary Edition", "Cosmic Odyssey"]
    // console.log(a.expansion)
    if (expansions.findIndex((e) => e === a[1].original.expansion) < expansions.findIndex((e) => e === b[1].original.expansion)) {
      return -1;
    }
    else if (expansions.findIndex((e) => e === a[1].original.expansion) > expansions.findIndex((e) => e === b[1].original.expansion)) {
      return 1;
    } else {
      if (a[1].original.name < b[1].original.name) {
        return -1;
      }
      else if (a[1].original.name > b[1].original.name) {
        return 1;
      }
    }
    return 0;
  })
  // console.log('sorted: ', aliens)
  return aliens
}

function filterAliens(aliens, search) {

  search = search || ""

  let filteredAliens = Object.entries(aliens);

  filteredAliens = filteredAliens.filter(alien => alien[1].original.name.toLowerCase().includes(search.toLowerCase()))
  return Object.fromEntries(filteredAliens)

}

function groupByN(n, arr) {
  let result = [];
  for (let i = 0; i < arr.length; i += n) result.push(arr.slice(i, i + n));
  return result;
};

export default function IndividualAlienPage() {

  const alien = {
    "name": useState(""),
    "alert": useState(""),
    "altTimelineID": useState(false),
    "short": useState(""),
    "gameSetup": useState(""),
    "powerName": useState(""),
    "powerBody": useState(""),
    "powerTiming": {
      "player": useState(""),
      "choice": useState(""),
      "phases": {
        "startTurn": useState(false),
        "regroup": useState(false),
        "destiny": useState(false),
        "launch": useState(false),
        "alliance": useState(false),
        "planning": useState(false),
        "reveal": useState(false),
        "resolution": useState(false)
      }
    },
    "history": useState(""),
    "wildBody": useState(""),
    "wildTiming": {
      "player": useState(""),
      "choice": useState(""),
      "phases": {
        "startTurn": useState(false),
        "regroup": useState(false),
        "destiny": useState(false),
        "launch": useState(false),
        "alliance": useState(false),
        "planning": useState(false),
        "reveal": useState(false),
        "resolution": useState(false)
      }
    },
    "superBody": useState(""),
    "superTiming": {
      "player": useState(""),
      "choice": useState(""),
      "phases": {
        "startTurn": useState(false),
        "regroup": useState(false),
        "destiny": useState(false),
        "launch": useState(false),
        "alliance": useState(false),
        "planning": useState(false),
        "reveal": useState(false),
        "resolution": useState(false)
      }
    },
    "expansion": useState(""),
    "designers": useState([]),
    "thumbnail": useState(""),
    "bans": useState([]),
    "essences": useState(null),
    "revisionNotes": useState("")
  }
  const [banAliensSearch, setBanAliensSearch] = useState("");


  return (
    <Layout title={alien.name}>
      <Helmet>
        <title>Homebrew Alien Submitter</title>
      </Helmet>
      <h1>Homebrew Alien Submitter</h1>
      <Card className="mx-1 bg-light">
        <CardBody>
          <Form onSubmit={
            (event) => {
              event.preventDefault();
              let newAlien = {}
              Object.keys(alien).forEach((key, i) => {
                if (['powerTiming', 'wildTiming', 'superTiming'].includes(key)) {
                  newAlien[key] = {
                    "player": alien[key].player[0],
                    "choice": alien[key].choice[0],
                    "phases": {
                      "startTurn": alien[key].phases.startTurn[0],
                      "regroup": alien[key].phases.regroup[0],
                      "destiny": alien[key].phases.destiny[0],
                      "launch": alien[key].phases.launch[0],
                      "alliance": alien[key].phases.alliance[0],
                      "planning": alien[key].phases.planning[0],
                      "reveal": alien[key].phases.reveal[0],
                      "resolution": alien[key].phases.resolution[0]
                    }
                  }
                } else {
                  newAlien[key] = alien[key][0]
                }
              })
              console.log(newAlien);
              uploadAlien(newAlien)
            }}>
            <div className="d-flex justify-content-center">
              <Button color="primary" className="w-50 mb-3 ">Submit</Button>
            </div>
            <DynamicFormGroup option={alien.name} id="alienName">Alien Name</DynamicFormGroup>
            <DynamicFormGroup option={alien.designers} id="designers">Creator's Name</DynamicFormGroup>
            <Row>
              <Col>
                <FormGroup row>
                  <Label className="text-dark" for="alertLevel" sm={4}>
                    Alert Level
                  </Label>
                  <Col sm={4}>
                    <Input
                      id="alertLevel"
                      name="alertLevel"
                      type="select"
                      onChange={(e) => alien.alert[1](e.target.value)}
                      value={alien.alert[0]}
                    >
                      <option value={""} disabled>
                        Please Select
                      </option>
                      <option value="Green">
                        Green
                      </option>
                      <option value="Yellow">
                        Yellow
                      </option>
                      <option value="Red">
                        Red
                      </option>
                    </Input>
                    {/* <Input
                  id="alienName"
                  className='text-dark d-inline'
                  value={alien.alert[0]}
                  onChange={(e) => {
                    if (!/[^ A-Za-z0-9\-,'/+\\]/.test(e.target.value)) {
                      alien.alert[1](e.target.value)
                    }
                  }}>
                </Input> */}
                  </Col>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup switch>
                  <Label className="text-dark" for="alertLevel" sm={3}>
                    Alt-Timeline
                  </Label>
                  <Input
                    className="mt-3"
                    type="switch"
                    role="switch"
                    checked={alien.altTimelineID[0]}
                    onChange={() => alien.altTimelineID[1](!alien.altTimelineID[0])} />
                </FormGroup>
              </Col>

            </Row>
            <DynamicFormGroup option={alien.short} id="alienShort">Upside-down Short Description</DynamicFormGroup>
            <FormGroup row>
              <Label className="text-dark" for="alienName" sm={2}>
                Alien Image URL
              </Label>
              <Col sm={8}>
                <Input
                  id="alienName"
                  className='text-dark d-inline'
                  value={alien.thumbnail[0]}
                  onChange={(e) => {
                    if (!/[^ A-Za-z0-9\-,'/+\\_:.]/.test(e.target.value)) {
                      alien.thumbnail[1](e.target.value)
                    }
                  }}>
                </Input>
              </Col>
              <Col sm={2}>
                <img alt={alien.name[0] + " Thumbnail"}
                  // src={require(`../../images/alien icons/avatar_${alien.name.replace('The ', '').replace(' ', '_')}${alien.altTimeline ? '_AT' : ''}.png`)} 
                  src={alien.thumbnail[0]}
                />
              </Col>
            </FormGroup>
            <DynamicFormGroup option={alien.powerBody} id="powerBody" textarea>Alien Power</DynamicFormGroup>
            <DynamicFormGroup option={alien.history} id="history" textarea>Alien History</DynamicFormGroup>
            <DynamicFormGroup option={alien.wildBody} id="wildBody" textarea>Wild Flare</DynamicFormGroup>
            <DynamicFormGroup option={alien.superBody} id="superBody" textarea>Super Flare Flare</DynamicFormGroup>
            <DynamicFormGroup option={alien.revisionNotes} id="designNotes" textarea>Design Notes</DynamicFormGroup>
            <p className='text-dark text-center h3'>Ban Aliens</p>
            <div className="border p-2 rounded border-3">
              <FormGroup>
                <Input
                  id="banAlienFilter"
                  name="banAlienFilter"
                  placeholder="Filter Aliens"
                  type="text"
                  value={banAliensSearch}
                  onChange={(e) => {
                    if (!/[^ A-Za-z0-9\-,]/.test(e.target.value)) {
                      setBanAliensSearch(e.target.value)
                    }
                  }}
                />
              </FormGroup>
              <div className="overflow-y-scroll overflow-x-hidden" style={{ height: '10vh', resize: "vertical" }}>
                {groupByN(6, sortAliens(filterAliens(Aliens.aliens, banAliensSearch))).map(row => {
                  return (
                    <Row key={row}>
                      {
                        row.map(vanillaAlien => {
                          return (
                            <Col sm={2} key={vanillaAlien}>
                              <FormGroup check>
                                <Input type="checkbox"
                                  className={alien.bans[0].includes(vanillaAlien[0]) ? "bg-danger border-danger-subtle" : ""}
                                  checked={alien.bans[0].includes(vanillaAlien[0])}
                                  onChange={() => {
                                    if (alien.bans[0].includes(vanillaAlien[0])) {
                                      alien.bans[1](alien.bans[0].filter(alienID => alienID !== vanillaAlien[0]))
                                    } else {
                                      alien.bans[1](alien.bans[0].concat([vanillaAlien[0]]))
                                    }
                                  }
                                  }
                                />
                                <Label className="text-dark" check>
                                  {vanillaAlien[1].original.name}
                                  {vanillaAlien[1].original.altTimeline ? (
                                    <Badge className="ms-1 text-light" color="dark">
                                      AT
                                    </Badge>) : null}
                                </Label>
                              </FormGroup>
                            </Col>)
                        })
                      }
                    </Row>
                  )
                }
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <Button color="primary" className="w-50 my-3 ">Submit</Button>
            </div>
          </Form>

        </CardBody>
      </Card>
    </Layout>
  );
}

