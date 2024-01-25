import React from 'react'
import { Link } from 'react-router-dom';

import {
  Card, CardBody
} from 'reactstrap';
import TimingBar from './TimingBar';

export default function Alien(props) {
    const alien = props.alien
    const tab = props.tab
    return (
        <div>
            <img alt={alien[tab].name + " Thumbnail"}
                className='float-end'
                // src={require(`../../images/alien icons/avatar_${alien[tab].name.replace('The ', '').replace(' ', '_')}${alien[tab].altTimeline ? '_AT' : ''}.png`)} 
                src={require(`../images/alien icons/${alien[tab].thumbnail}`)}
            />
            <span><h1 className='text-light d-inline'>{alien[tab].altTimeline ? (alien[tab].name + " (AT)") : alien[tab].name}</h1> <h3 className='text-light d-inline'>({alien[tab].alert})</h3> <h3 className='text-light d-inline'>({alien[tab].expansion})</h3></span>
            <h3 className='text-light'>{alien[tab].short}</h3>
            
            {alien[tab].gameSetup ? <p><strong>Game Setup:</strong> {alien[tab].gameSetup}</p> : null}
            {/* dangerouslySetInnerHTML is, well, dangerous when used on user submitted stuff. But aliens.json is trustworthy, so this is fine albiet jank.
  If/when I add a homebrew aliens option, PLEASE PLEASE PLEASE dont forget to sanitise them. */}
            <p><strong>{alien[tab].powerName}</strong> <span dangerouslySetInnerHTML={
                {
                    __html: alien[tab].powerBody
                        .replaceAll('may use this power', '<strong><em>may use</em></strong> this power')
                        .replaceAll('use this power', '<strong><em>use</em></strong> this power')
                        .replaceAll('Use this power', '<strong><em>Use</em></strong> this power')
                        .replaceAll('this power is used', 'this power is <strong><em>used</em></strong>')
                }
            } />
            </p>
            {alien[tab].powerSpecialName ?
                <p><strong>{alien[tab].powerSpecialName}</strong> <span dangerouslySetInnerHTML={
                    {
                        __html: alien[tab].powerSpecialBody
                            .replaceAll('may use this power', '<strong><em>may use</em></strong> this power')
                            .replaceAll('use this power', '<strong><em>use</em></strong> this power')
                            .replaceAll('Use this power', '<strong><em>Use</em></strong> this power')
                            .replaceAll('this power is used', 'this power is <strong><em>used</em></strong>')
                    }
                } />
                </p>
                : null}
            <br />
            <p><em>{alien[tab].history}</em></p>
            {alien[tab].bans ?
                <p className='fs-3'>Do not use with {
                    Object.keys(alien[tab].bans).map((banID, index) => {
                        // console.log(bannedAlien)
                        return <span key={banID}><Link to={`/Aliens/${banID}`}>{
                            alien[tab].bans[banID]
                        }</Link>{index !== Object.keys(alien[tab].bans).length - 1 ? <span>, or </span> : null}</span>
                    })
                }</p>
                : null
            }

            <p></p>
            <TimingBar timing={alien[tab].powerTiming} />
            <br />
            <h3>Wild Flare</h3>
            <p>{alien[tab].wildBody}</p>
            <TimingBar timing={alien[tab].wildTiming} />
            <br />
            <h3>Super Flare</h3>
            <p>{alien[tab].superBody}</p>
            <TimingBar timing={alien[tab].superTiming} />
            <br />
            <br />{
                alien[tab].wildClassicBody ? (
                    <div>
                        <h3>Classic Wild Flare</h3>
                        <p>{alien[tab].wildClassicBody}</p>
                        <TimingBar timing={alien[tab].wildClassicTiming} />
                        <br />
                        <h3>Classic Super Flare</h3>
                        <p>{alien[tab].superClassicBody}</p>
                        <TimingBar timing={alien[tab].superClassicTiming} />
                    </div>
                ) : null
            }
            {alien[tab].essences ? <div>
                <h3>{alien[tab].name} {alien[tab].essences.name}s</h3>
                <ol>
                    {Object.keys(alien[tab].essences.list).sort().map((essenceID => {
                        return <li><strong>{alien[tab].essences.list[essenceID].name}</strong>: {alien[tab].essences.list[essenceID].body}{
                            alien[tab].essences.list[essenceID].value ? <strong className='font-digit fs-4'> {alien[tab].essences.list[essenceID].value}</strong> : null
                        }</li>
                    }))}

                </ol>
            </div>
                : null}


            {alien[tab].revisionNotes ? (
                <Card className="bg-light border-warning border-5">
                    <CardBody>
                        <p className="text-dark">{alien[tab].revisionNotes}</p>
                    </CardBody>
                </Card>
            ) : null}
        </div>
    );
}