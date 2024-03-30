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
        return part.value.split(' ').map((word, j) => <PartStyle key={`${i}${j}`} part={part} viewMode={viewMode} tab={tab}>{j === 0 ? `${word}` : ` ${word}`}</PartStyle>)
    }

    // console.log(alien)

    // console.log(diffChars(alien.original.powerBody, alien.revised.powerBody))

    // if (revisions){
    //     alien.revised.powerBody = alien.original.powerBody;
    //     let length_mod = 0;
    //     for (const powerRevision of revisions.powerBody){
    //         alien.revised.powerBody = alien.revised.powerBody.slice(0, powerRevision.start - length_mod) + powerRevision.newValue + alien.revised.powerBody.slice(powerRevision.end - length_mod)
    //         length_mod += powerRevision.end - powerRevision.start + powerRevision.newValue.length
    //     }
    // }

    // console.log(alien.powerBody[0].value.split(' '))

    return (
        <div>
            <img alt={alien.name + " Thumbnail"}
                className='float-end'
                // src={require(`../../images/alien icons/avatar_${alien.name.replace('The ', '').replace(' ', '_')}${alien.altTimeline ? '_AT' : ''}.png`)} 
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
            {/* dangerouslySetInnerHTML is, well, dangerous when used on user submitted stuff. But aliens.json is trustworthy, so this is fine albiet jank.
  If/when I add a homebrew aliens option, PLEASE PLEASE PLEASE dont forget to sanitise them. */}
            <p><strong>{alien.powerName.map(handleParts)}</strong> {alien.powerBody.map(handleParts)}
            </p>
            {alien.powerSpecialName ?
                <p><strong>{alien.powerSpecialName}</strong> <span dangerouslySetInnerHTML={
                    {
                        __html: alien.powerSpecialBody
                            .replaceAll('may use this power', '<strong><em>may use</em></strong> this power')
                            .replaceAll('use this power', '<strong><em>use</em></strong> this power')
                            .replaceAll('this power is used', 'this power is <strong><em>used</em></strong>')
                    }
                } />
                </p>
                : null}
            <br />
            <p><em>
                {alien.history.map(handleParts)}
                {/* {alien.history} */}
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
                        // console.log(bannedAlien)
                        return <PartStyle key={part} part={part} viewMode={viewMode} tab={tab}><Link to={`/Aliens/${part.value.id}`}>
                            {part.value.name}
                        </Link>{index !== Object.keys(alien.bans).length - 1 ? <span>, or </span> : null}</PartStyle>
                    })
                }</p>
                : <></>
            }
            <p>
                <PlayerTiming player={
                    alien.powerTiming.player.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            {part.value}
                        </PartStyle>)
                } />
                {/* {
                    alien.powerTiming.player.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            <PlayerTiming player={part.value} />
                        </PartStyle>)
                } */}
                {
                    alien.powerTiming.choice.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            <ChoiceTiming choice={part.value} />
                        </PartStyle>)
                }
                {
                    alien.powerTiming.phases.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            <PhaseTiming phases={part.value} />
                        </PartStyle>)
                }
            </p>
            <br />
            <h3>Wild Flare</h3>
            <p>{alien.wildBody.map(handleParts)}</p>
            {/* <p>{alien.wildBody}</p> */}
            <p>
                <PlayerTiming player={
                    alien.wildTiming.player.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            {part.value}
                        </PartStyle>)
                } />
                {/* {
                    alien.wildTiming.player.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            {part.value}
                        </PartStyle>)
                } */}
                {
                    alien.wildTiming.phases.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            <PhaseTiming phases={part.value} flare />
                        </PartStyle>)
                }
            </p>
            {/* <TimingBar timing={alien.wildTiming} /> */}
            <br />
            <h3>Super Flare</h3>
            <p>{alien.superBody.map(handleParts)}</p>
            {/* <p>{alien.superBody}</p> */}
            {/* <TimingBar timing={alien.superTiming} /> */}
            <p>
                <PlayerTiming player={
                    alien.superTiming.player.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            {part.value}
                        </PartStyle>)
                } />
                {/* {
                    alien.superTiming.player.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            <PlayerTiming player={part.value} />
                        </PartStyle>)
                } */}
                {
                    alien.superTiming.phases.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            <PhaseTiming phases={part.value} flare />
                        </PartStyle>)
                }
            </p>{
                alien.wildClassicBody ? (
                    <div>
                        <h3>Classic Wild Flare</h3>
                        <p>{alien.wildClassicBody.map(handleParts)}</p>
                        <p>
                            <PlayerTiming player={
                                alien.wildClassicTiming.player.map((part, i) =>
                                    <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                                        {part.value}
                                    </PartStyle>)
                            } />
                            {
                                alien.wildClassicTiming.phases.map((part, i) =>
                                    <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                                        <PhaseTiming phases={part.value} flare />
                                    </PartStyle>)
                            }
                        </p>
                        {/* <p>{alien.wildClassicBody}</p>
                        <TimingBar timing={alien.wildClassicTiming} /> */}
                        <br />
                        <h3>Classic Super Flare</h3>
                        <p>{alien.superClassicBody.map(handleParts)}</p>
                        <p>
                            <PlayerTiming player={
                                alien.superClassicTiming.player.map((part, i) =>
                                    <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                                        {part.value}
                                    </PartStyle>)
                            } />
                            {
                                alien.superClassicTiming.phases.map((part, i) =>
                                    <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                                        <PhaseTiming phases={part.value} flare />
                                    </PartStyle>)
                            }
                        </p>
                        {/* <p>{alien.superClassicBody}</p>
                        <TimingBar timing={alien.superClassicTiming} /> */}
                    </div>
                ) : <></>
            }
            {alien.essences ? <div>
                <h3>{alien.name} {alien.essences.name}s</h3>
                <ol>
                    {Object.keys(alien.essences.list).sort().map((essenceID => {
                        return <li><strong>{alien.essences.list[essenceID].name}</strong>: {alien.essences.list[essenceID].body}{
                            alien.essences.list[essenceID].value ? <strong className='font-digit fs-4'> {alien.essences.list[essenceID].value}</strong> : null
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