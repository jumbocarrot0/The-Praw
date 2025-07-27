import React, { useState } from 'react'
import {
    Card, CardBody, Nav, NavItem, NavLink, FormGroup, Input, Label
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
import TimingBar from '../../components/TimingBar'
import PartStyle, { VERSIONS, MODES } from '../../components/PartStyle'

export default function IndividualLuxPage() {

    const lux = useRouteLoaderData("luxIndex")
    const [tab, setTab] = useState("original")
    const [viewMode, setViewMode] = useState(MODES.PLAIN)

    function handleParts(part, i) {
        return part.value.split(' ').map((word, j) => <PartStyle key={`${i}${j}`} part={part} viewMode={viewMode ? MODES.REVISION_EXPLAINATION : MODES.PLAIN} tab={tab}>{j === 0 ? `${word}` : ` ${word}`}</PartStyle>)
    }

    if (lux === null) {
        return <></>
    }

    return (
        <div>
            <Nav className="ps-5 mx-1" tabs>
                {
                    lux.versions.map(version =>
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
                    <h1 className='text-light'>{lux.name}</h1>
                    <p>{lux.body.map(handleParts)}</p>
                    <br />
                    <TimingBar timing={lux.timing} viewMode={viewMode} tab={tab} />
                </CardBody>
            </Card>
        </div>
    );
}

