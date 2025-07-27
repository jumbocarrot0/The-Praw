import React, { useState } from 'react'
import {
    Card, CardBody, Nav, NavItem, NavLink, FormGroup, Input, Label
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
import PartStyle from '../../components/PartStyle'

const VERSIONS = {
    "original": "Original",
    "revised": "Revised",
    "homebrew": "House Rules"
}

const MODES = {
    "PLAIN": 0,
    "REVISION_EXPLAINATION": 1
}

export default function IndividualObjectivePage() {

    const objective = useRouteLoaderData("objectiveIndex")
    const [tab, setTab] = useState("original")
    const [viewMode, setViewMode] = useState(false)
    
    function handleParts(part, i) {
        return part.value.split(' ').map((word, j) => <PartStyle key={`${i}${j}`} part={part} viewMode={viewMode ? MODES.REVISION_EXPLAINATION : MODES.PLAIN} tab={tab}>{j === 0 ? `${word}` : ` ${word}`}</PartStyle>)
    }

    if (objective === null) {
        return <></>
    }

    return (
        <div>
            <Nav className="ps-5 mx-1" tabs>
                {
                    objective.versions.map(version =>
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
                    <h1 className='text-light'>{objective.name}</h1>

                    <p>{objective.body.map(handleParts)}</p>
                    <p className='font-digit fs-big'>{objective.points.map(handleParts)}</p>
                    <br />

                </CardBody>
            </Card>
        </div>
    );
}

