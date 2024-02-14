import React, { useState, useRef } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink, Label, Input, FormGroup, Container, Alert, UncontrolledTooltip
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

  const [viewMode, setViewMode] = useState(false)

  return (
    <React.Suspense fallback={<Loading />}>
      <Await
        resolve={alien.alien}
        errorElement={
          <p>Error loading alien!</p>
        }
      >
        {(alien) => {
          // console.log(alien)
          return (
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
                  {
                    tab !== "original" ?
                      <FormGroup switch>
                        <Input type="switch" role="switch" checked={viewMode} onChange={(e) => setViewMode(e.target.checked)} />
                        <Label check>Show Difference</Label>
                      </FormGroup>
                      : <></>
                  }
                  <Alien alien={alien} tab={tab} viewMode={viewMode ? MODES.REVISION_EXPLAINATION : MODES.PLAIN} />
                </CardBody>
              </Card>
              <Container className='mt-3'>
                {alien.faq.length > 0 ? <h1>FAQ</h1> : <></>}
                {alien.faq.map((entry, i) => {
                  const id = `faqIcon${i}`
                  return <Card key={i} className='mb-3' color={entry.tags.includes('Contentious') ? "warning" : "white"} outline>
                    <CardBody style={{ textIndent: '1em hanging' }}>
                      {entry.tags.includes('Contentious') ?
                        <>
                          <span id={id}>
                            <div className='float-start pe-3 text-warning'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                                <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                              </svg>
                            </div>
                          </span>
                          <UncontrolledTooltip
                            target={id}
                          >
                            This FAQ entry is problematic for some reason
                          </UncontrolledTooltip>
                        </>
                        : <></>
                      }
                      <p className='mb-0'><em>Q: {entry.question}</em></p>
                      <p>A: {entry.answer}</p>
                      {entry.notes ?
                        <Alert style={{ textIndent: '0', whiteSpace: "pre-line" }} color={entry.tags.includes('Contentious') ? "warning" : "info"}>
                          {entry.notes}
                        </Alert>
                        : <></>
                      }
                      <p>(Origin: {entry.source})</p>
                    </CardBody>
                  </Card>
                })}
              </Container>
            </>
          )
        }}
      </Await>
    </React.Suspense>
  );
}

