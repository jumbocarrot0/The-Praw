import React, { useState } from 'react'
import {
    Card, CardBody, Nav, NavItem, NavLink, FormGroup, Input, Label
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
import TimingBar from '../../components/TimingBar';
import PartStyle, { VERSIONS, MODES } from '../../components/PartStyle'

export default function IndividualStationPage() {

    const station = useRouteLoaderData("stationIndex")
    const [tab, setTab] = useState("original")
    const [viewMode, setViewMode] = useState(MODES.PLAIN)

    function handleParts(part, i) {
        return part.value.split(' ').map((word, j) => <PartStyle key={`${i}${j}`} part={part} viewMode={viewMode ? MODES.REVISION_EXPLAINATION : MODES.PLAIN} tab={tab}>{j === 0 ? `${word}` : ` ${word}`}</PartStyle>)
    }

    if (station === null) {
        return <></>
    }

    return (
        <div>
            <Nav className="ps-5 mx-1" tabs>
                {
                    station.versions.map(version =>
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
                    {station.thumbnail ? <img alt={station.name + " Thumbnail"}
                        className='float-end'
                        src={require(`../../images/${station.thumbnail}`)}
                    /> : null}

                    <span>
                        <h1 className='text-light d-inline'>{station.name}</h1> <h3 className='text-light d-inline'>({station.expansion})</h3>
                    </span>
                    <h3 className='text-light'>{station.type}</h3>
                    <p>{station.body.map(handleParts)}</p>
                    <br />
                    <TimingBar timing={station.timing} viewMode={viewMode} tab={tab} />
                </CardBody>
            </Card>
        </div>
    );
}

