import React, { useState } from 'react'
import {
    Card, CardBody, Nav, NavItem, NavLink, FormGroup, Input, Label
} from 'reactstrap';
import { useRouteLoaderData } from "react-router-dom"
// import Techs from '../../dataFiles/technology.json';
import TimingBar from '../../components/TimingBar';
import PartStyle, { VERSIONS, MODES } from '../../components/PartStyle'

export default function IndividualTechPage() {

    // const { techIndex } = useParams();

    const tech = useRouteLoaderData("techIndex")
    const [tab, setTab] = useState("original")
    const [viewMode, setViewMode] = useState(MODES.PLAIN)

    function handleParts(part, i) {
        return part.value.split(' ').map((word, j) => <PartStyle key={`${i}${j}`} part={part} viewMode={viewMode ? MODES.REVISION_EXPLAINATION : MODES.PLAIN} tab={tab}>{j === 0 ? `${word}` : ` ${word}`}</PartStyle>)
    }

    if (tech === null) {
        return <></>
    }

    return (
        <div>
            <Nav className="ps-5 mx-1" tabs>
                {
                    tech.versions.map(version =>
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
                    {tech.thumbnail ? <img alt={tech.name + " Thumbnail"}
                        className='float-end'
                        src={require(`../../images/${tech.thumbnail}`)}
                    /> : null}
                    <span>
                        <h1 className='text-light d-inline'>{tech.name}</h1> <h3 className='text-light d-inline'>({tech.expansion})</h3>
                    </span>
                    <h3 className='text-light'>{tech.type}</h3>
                    {tech.refresh ? <p>When completed, draw another Tech.</p> : null}
                    <p><strong>{tech.short.map(handleParts)}</strong> {tech.body.map(handleParts)}</p>
                    <div style={{ width: (tech.type === "Mili-Tech" ? 75 : 50) + 'px', height: (tech.type === "Mili-Tech" ? 40 : 50) + 'px' }} className={
                        tech.type === "Mili-Tech" ? 'border rounded bg-success text-light text-center mb-2 fs-3' : 'border rounded-circle bg-indigo text-light text-center mb-2 fs-2'
                    }>
                        <strong><p className='font-digit' style={{ paddingTop: 0 + 'px', textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", lineHeight: (tech.type === "Mili-Tech" ? 37 : 45) + "px" }}>{tech.cost}</p></strong>
                    </div>
                    <TimingBar timing={tech.timing} viewMode={viewMode} tab={tab} />

                </CardBody>
            </Card>
        </div>
    );
}

