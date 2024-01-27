import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import {
    Card, CardBody
} from 'reactstrap';
import TimingBar, { PlayerTiming, ChoiceTiming, PhaseTiming } from './TimingBar';
import PartStyle from './PartStyle'
import { diffChars, diffWords, diffJson } from 'diff';

const MODES = {
    "PLAIN": 0,
    "REVISION_EXPLAINATION": 1
}

export default function Alien(props) {
    const alien = props.alien
    const tab = props.tab
    const viewMode = props.viewMode

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

    return (
        <div>
            <img alt={alien.name + " Thumbnail"}
                className='float-end'
                // src={require(`../../images/alien icons/avatar_${alien.name.replace('The ', '').replace(' ', '_')}${alien.altTimeline ? '_AT' : ''}.png`)} 
                src={require(`../images/alien icons/${alien.thumbnail}`)}
            />
            <span><h1 className='text-light d-inline'>{alien.altTimeline ? (alien.name + " (AT)") : alien.name}</h1> <h3 className='text-light d-inline'>({alien.alert})</h3> <h3 className='text-light d-inline'>({alien.expansion})</h3></span>
            <h3 className='text-light'>{alien.short}</h3>

            {alien.gameSetup ? <p><strong>Game Setup:</strong> {alien.gameSetup.map((part, i) => <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>{part.value}</PartStyle>)}</p> : null}
            {/* dangerouslySetInnerHTML is, well, dangerous when used on user submitted stuff. But aliens.json is trustworthy, so this is fine albiet jank.
  If/when I add a homebrew aliens option, PLEASE PLEASE PLEASE dont forget to sanitise them. */}
            <p><strong>{alien.powerName}</strong> {alien.powerBody.map((part, i) => <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>{part.value}</PartStyle>)}
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
                {alien.history.map((part, i) => <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>{part.value}</PartStyle>)}
                {/* {alien.history} */}
            </em></p>
            {alien.bans ?
                <p className='fs-3'>Do not use with {
                    Object.keys(alien.bans).map((banID, index) => {
                        // console.log(bannedAlien)
                        return <span key={banID}><Link to={`/Aliens/${banID}`}>{
                            alien.bans[banID]
                        }</Link>{index !== Object.keys(alien.bans).length - 1 ? <span>, or </span> : null}</span>
                    })
                }</p>
                : null
            }
            <p>
                {
                    alien.powerTiming.player.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            <PlayerTiming player={part.value} />
                        </PartStyle>)
                }
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
            {alien.wildBody.map((part, i) => <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>{part.value}</PartStyle>)}
            {/* <p>{alien.wildBody}</p> */}
            <p>
                {
                    alien.wildTiming.player.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            <PlayerTiming player={part.value} />
                        </PartStyle>)
                }
                {
                    alien.wildTiming.phases.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            <PhaseTiming phases={part.value} />
                        </PartStyle>)
                }
            </p>
            {/* <TimingBar timing={alien.wildTiming} /> */}
            <br />
            <h3>Super Flare</h3>
            {alien.superBody.map((part, i) => <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>{part.value}</PartStyle>)}
            {/* <p>{alien.superBody}</p> */}
            {/* <TimingBar timing={alien.superTiming} /> */}
            <p>
                {
                    alien.superTiming.player.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            <PlayerTiming player={part.value} />
                        </PartStyle>)
                }
                {
                    alien.superTiming.phases.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            <PhaseTiming phases={part.value} />
                        </PartStyle>)
                }
            </p>
            <br />
            <br />{
                alien.wildClassicBody ? (
                    <div>
                        <h3>Classic Wild Flare</h3>
                        <p>{alien.wildClassicBody}</p>
                        <TimingBar timing={alien.wildClassicTiming} />
                        <br />
                        <h3>Classic Super Flare</h3>
                        <p>{alien.superClassicBody}</p>
                        <TimingBar timing={alien.superClassicTiming} />
                    </div>
                ) : null
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