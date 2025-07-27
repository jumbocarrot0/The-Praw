import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import {
    Card, CardBody
} from 'reactstrap';
import TimingBar, { PlayerTiming, ChoiceTiming, PhaseTiming } from './TimingBar';
import PartStyle from './PartStyle'

const MODES = {
    "PLAIN": 0,
    "REVISION_EXPLAINATION": 1
}

export default function Alien(props) {
    const alien = props.alien
    const tab = props.tab
    const viewMode = props.viewMode

    function handleParts(part, i) {
        return part.value.split(' ').map((word, j) => <PartStyle key={`${i}${j}`} part={part} viewMode={viewMode ? MODES.REVISION_EXPLAINATION : MODES.PLAIN} tab={tab}>{j === 0 ? `${word}` : ` ${word}`}</PartStyle>)
    }

    return (
        <div>
            <img alt={alien.name + " Thumbnail"}
                className='float-end'
                src={require(`../images/alien icons/${alien.thumbnail}`)}
            />
            <span><h1 className='text-light d-inline'>{alien.altTimeline ? (alien.name + " (AT)") : alien.name}</h1> <h3 className='text-light d-inline'>({alien.alert})</h3> <h3 className='text-light d-inline'>({alien.expansion})</h3></span>
            <h3 className='text-light'>{alien.short.map(handleParts)}</h3>

            {alien.gameSetup && alien.gameSetup.filter(
                part => !(
                    ((part.style)[tab] ?? []).includes("none")
                    ||
                    (
                        viewMode !== MODES.REVISION_EXPLAINATION
                        &&
                        (part.style[tab] ?? []).includes("removed")
                    )
                    ||
                    part.value.length === 0
                )
            ).length > 0 ? <p><strong>Game Setup:</strong> {alien.gameSetup.map(handleParts)}</p> : <></>}
            <p>{alien.powerBody.map(handleParts)}
            </p>
            {alien.powerSpecialName ?
                <p><strong>{alien.powerSpecialName.map(handleParts)}</strong> {alien.powerSpecialBody.map(handleParts)}
                </p>
                : <></>}
            <br />
            <p><em>
                {alien.history.map(handleParts)}
            </em></p>
            {alien.bans && alien.bans.filter(
                part => !(
                    ((part.style)[tab] ?? []).includes("none")
                    ||
                    (
                        viewMode !== MODES.REVISION_EXPLAINATION
                        &&
                        (part.style[tab] ?? []).includes("removed")
                    )
                    ||
                    part.value.name.length === 0
                )
            ).length > 0 ?
                <p className='fs-3'>Do not use with {
                    alien.bans.map((part, index) => {
                        return <PartStyle key={part} part={part} viewMode={viewMode} tab={tab}><Link to={`/Aliens/${part.value.id}`}>
                            {part.value.name}
                        </Link>{index !== Object.keys(alien.bans).length - 1 ? <span>, or </span> : null}</PartStyle>
                    })
                }</p>
                : <></>
            }
            <p>
                <TimingBar timing={alien.powerTiming} viewMode={viewMode} tab={tab} />
            </p>
            <br />
            <h3>Wild Flare</h3>
            <p>{alien.wildBody.map(handleParts)}</p>
            <p>
                <TimingBar timing={alien.wildTiming} viewMode={viewMode} tab={tab} />
            </p>
            <br />
            <h3>Super Flare</h3>
            <p>{alien.superBody.map(handleParts)}</p>
            <p>
                <TimingBar timing={alien.superTiming} viewMode={viewMode} tab={tab} />
            </p>{
                alien.wildClassicBody ? (
                    <div>
                        <h3>Classic Wild Flare</h3>
                        <p>{alien.wildClassicBody.map(handleParts)}</p>
                        <p>
                            <TimingBar timing={alien.wildClassicTiming} viewMode={viewMode} tab={tab} />
                        </p>
                        <br />
                        <h3>Classic Super Flare</h3>
                        <p>{alien.superClassicBody.map(handleParts)}</p>
                        <p>
                            <TimingBar timing={alien.superClassicTiming} viewMode={viewMode} tab={tab} />
                        </p>
                    </div>
                ) : <></>
            }
            {alien.essences ? <div>
                <h3>{alien.name} {alien.essences.name.map(handleParts)}s</h3>
                <ol>
                    {Object.keys(alien.essences.list).sort().map((essenceID => {
                        return <li key={essenceID}><strong>{alien.essences.list[essenceID].name.map(handleParts)}</strong>: {alien.essences.list[essenceID].body.map(handleParts)}{
                            alien.essences.list[essenceID].value ? <strong className='font-digit fs-4'> {alien.essences.list[essenceID].value.map(handleParts)}</strong> : null
                        }</li>
                    }))}

                </ol>
            </div>
                : null}


            {alien.revisionNotes ? (
                <Card className="bg-light border-warning border-5">
                    <CardBody>
                        <p className="text-dark">{alien.revisionNotes}</p>
                    </CardBody>
                </Card>
            ) : null}
        </div>
    );
}