export default function Phases(props) {
    if (props.flare && (Object.values(props.phases).reduce((accumulator, phase) => accumulator + phase) >= 8)) {
      return <span>(Any Phase)</span>
    } else {
      return <span>
        {props.phases.startTurn ? "(Start Turn) " : null}
        {props.phases.regroup ? "(Regroup) " : null}
        {props.phases.destiny ? "(Destiny) " : null}
        {props.phases.launch ? "(Launch) " : null}
        {props.phases.alliance ? "(Alliance) " : null}
        {props.phases.planning ? "(Planning) " : null}
        {props.phases.reveal ? "(Reveal) " : null}
        {props.phases.resolution ? "(Resolution) " : null}
        {props.phases.special ? "(Special) " : null}
        {props.phases.gameSetup ? "(Game Setup) " : null}
        {props.phases.varies ? "(Varies) " : null}
      </span>
    }
  }