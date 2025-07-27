import React, { useState } from 'react';
import {
    Card, CardBody, Nav, NavItem, NavLink, FormGroup, Input, Label
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
import TimingBar from '../../components/TimingBar';
import PartStyle, { VERSIONS, MODES } from '../../components/PartStyle'

export default function IndividualEnvoyPage() {

    const envoy = useRouteLoaderData("envoyIndex")
    const [tab, setTab] = useState("original")
    const [viewMode, setViewMode] = useState(MODES.PLAIN)

    function handleParts(part, i) {
        return part.value.split(' ').map((word, j) => <PartStyle key={`${i}${j}`} part={part} viewMode={viewMode ? MODES.REVISION_EXPLAINATION : MODES.PLAIN} tab={tab}>{j === 0 ? `${word}` : ` ${word}`}</PartStyle>)
    }

    if (envoy === null) {
        return <></>
    }

    return (
        <div >
            <Nav className="ps-5 mx-1" tabs>
                {
                    envoy.versions.map(version =>
                        <NavItem key={version}>
                            <NavLink className={"nav-link" + (tab === version ? " active" : "")} aria-current="page" href="#"
                                onClick={() => { setTab(version) }}>{VERSIONS[version]}</NavLink>
                        </NavItem>)
                }
            </Nav>
            <Card className={"mx-1 border-top-0 rounded-top-0"}>
                <CardBody>
                    {
                        tab !== "original" ?
                            <FormGroup switch>
                                <Input type="switch" role="switch" checked={viewMode} onChange={(e) => setViewMode(e.target.checked ? MODES.REVISION_EXPLAINATION : MODES.PLAIN)} />
                                <Label check>Show Difference</Label>
                            </FormGroup>
                            : <></>
                    }

                    <div>
                        <img alt={envoy.name + " Thumbnail"}
                            className='float-end'
                            src={require(`../../images/${envoy.thumbnail}`)}
                        />
                        <h1 className='text-light'>{envoy.name}</h1>

                        {envoy.gameSetup ? <p><strong>Game Setup:</strong> {envoy.map(handleParts)}</p> : null}
                        <p>{envoy.powerBody.map(handleParts)}</p>
                        <p><em>{envoy.history.map(handleParts)}</em></p>
                        <TimingBar timing={envoy.powerTiming} viewMode={viewMode} tab={tab} />
                    </div>

                </CardBody>
            </Card>
        </div>
    );
}

