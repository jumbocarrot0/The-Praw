import React, { useState } from 'react';
import {
    Card, CardBody, Nav, NavItem, NavLink, Label, Input, FormGroup
} from 'reactstrap';
import TimingBar from '../../components/TimingBar';
import { Link } from 'react-router-dom';
import { useRouteLoaderData } from "react-router-dom"
import PartStyle, { VERSIONS, MODES } from '../../components/PartStyle'

export default function IndividualSpecialShipPage() {

    const specialShip = useRouteLoaderData("specialShipIndex")
    const [tab, setTab] = useState("original")
        const [viewMode, setViewMode] = useState(MODES.PLAIN)

    function handleParts(part, i) {
        return part.value.split(' ').map((word, j) => <PartStyle key={`${i}${j}`} part={part} viewMode={viewMode ? MODES.REVISION_EXPLAINATION : MODES.PLAIN} tab={tab}>{j === 0 ? `${word}` : ` ${word}`}</PartStyle>)
    }

    if (specialShip === null) {
        return <></>
    }

    // console.log(specialShip)

    return (
        <div >
            <Nav className="ps-5 mx-1" tabs>
                {
                    specialShip.versions.map(version =>
                        <NavItem key={version}>
                            <NavLink className={"nav-link" + (tab === version ? " active" : "")} aria-current="page" href="#"
                                onClick={() => { setTab(version) }}>{VERSIONS[version]}</NavLink>
                        </NavItem>)
                }
            </Nav>
            <Card className="mx-1 border-top-0 rounded-top-0">
                <CardBody>
                    <div>
                        <span>
                            <h1 className='text-light d-inline'>{specialShip.name}</h1> <h3 className='text-light d-inline'>({specialShip.expansion})</h3>
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

                        {
                            tab !== "original" ?
                                <FormGroup switch>
                                    <Input type="switch" role="switch" checked={viewMode} onChange={(e) => setViewMode(e.target.checked ? MODES.REVISION_EXPLAINATION : MODES.PLAIN)} />
                                    <Label check>Show Difference</Label>
                                </FormGroup>
                                : <></>
                        }

                        <p><strong>Passive:</strong> {specialShip.powerBody.map(handleParts)}</p>
                        <TimingBar timing={specialShip.powerTiming} viewMode={viewMode} tab={tab} />
                        <br/>
                        <br/>
                        <p><strong>{specialShip.specialName}:</strong> {specialShip.specialBody.map(handleParts)}</p>
                        <TimingBar timing={specialShip.specialTiming} viewMode={viewMode} tab={tab} />

                        {specialShip.revisionNotes ? (
                            <Card className="bg-light border-warning border-5">
                                <CardBody>
                                    <p className="text-dark">{specialShip.revisionNotes}</p>
                                </CardBody>
                            </Card>
                        ) : null}
                    </div>

                </CardBody>
            </Card>
        </div>
    );
}

