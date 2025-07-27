import Phases from './Phases';
import PartStyle from "./PartStyle"

export default function TimingBar(props) {

    const { viewMode, tab } = props

    return (
        <>
            <PlayerTiming player={props.timing.player} viewMode={viewMode} tab={tab} />
            {props.timing.choice ?
                <ChoiceTiming choice={props.timing.choice} viewMode={viewMode} tab={tab} /> : null
            }
            {
                props.timing.phases.map((part, i) =>
                    <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                        <PhaseTiming phases={part.value} />
                    </PartStyle>)
            }
        </>
    )
}

export function PlayerTiming(props) {

    const { viewMode, tab } = props

    return (
        <span className='me-1 text-primary'>
            (
            <span className='text-decoration-underline'>
                <span className="text-light">
                    {props.player.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            {part.value}
                        </PartStyle>)}
                </span>
            </span>
            )
        </span>
    )
}

export function ChoiceTiming(props) {

    const { viewMode, tab } = props

    return (
        <span className='me-1 text-danger-emphasis'>
            (
            <span className='text-decoration-underline'>
                <span className="text-light">{
                    props.choice.map((part, i) =>
                        <PartStyle key={i} part={part} viewMode={viewMode} tab={tab}>
                            {part.value}
                        </PartStyle>)
                }</span>
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