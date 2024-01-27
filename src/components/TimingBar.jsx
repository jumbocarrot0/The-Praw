import Phases from '../components/Phases';

export default function TimingBar(props) {
    return (
        <>
            <PlayerTiming player={props.timing.player} />
            {props.choice ?
                <ChoiceTiming choice={props.timing.player} /> : null
            }
            <PhaseTiming phases={props.timing.phases} />
        </>
    )
}

export function PlayerTiming(props) {
    return (
        <span className='me-1 text-primary'>
            (
            <span className='text-decoration-underline'>
                <span className="text-light">{props.player}</span>
            </span>
            )
        </span>
    )
}

export function ChoiceTiming(props) {
    return (
        <span className='me-1 text-danger-emphasis'>
            (
            <span className='text-decoration-underline'>
                <span className="text-light">{props.choice}</span>
            </span>
            )
        </span>
    )
}

function Phase(props) {
    return (
        <span className='text-orange'>
            (
            <span className='text-decoration-underline'>
                <span className="text-light">{props.children}</span>
            </span>
            )
        </span>
    )
}

export function PhaseTiming(props) {
    if (props.flare && (Object.values(props.phases).reduce((accumulator, phase) => accumulator + phase) >= 8)) {
        return <Phase>Any Phase</Phase>
    } else {
        return <span>
            {props.phases.startTurn ? <Phase>Start Turn</Phase> : null}
            {props.phases.regroup ? <Phase>Regroup</Phase> : null}
            {props.phases.destiny ? <Phase>Destiny</Phase> : null}
            {props.phases.launch ? <Phase>Launch</Phase> : null}
            {props.phases.alliance ? <Phase>Alliance</Phase> : null}
            {props.phases.planning ? <Phase>Planning</Phase> : null}
            {props.phases.reveal ? <Phase>Reveal</Phase> : null}
            {props.phases.resolution ? <Phase>Resolution</Phase> : null}
            {props.phases.special ? <Phase>Special</Phase> : null}
            {props.phases.gameSetup ? <Phase>Game Setup</Phase> : null}
            {props.phases.varies ? <Phase>Varies</Phase> : null}
            {props.phases.secret ? <Phase>???</Phase> : null}
        </span>
    }
}