import Phases from '../components/Phases';

export default function TimingBar(props) {
    return (
        <p><span className='text-primary'>
            (
            <span className='text-decoration-underline'>
                <span className="text-light">{props.timing.player}</span>
            </span>
            )
        </span>
            {props.timing.choice ?
                <span className='ms-1 text-danger-emphasis'>
                    (
                    <span className='text-decoration-underline'>
                        <span className="text-light">{props.timing.choice}</span>
                    </span>
                    )
                </span>
                : null
            } <Phases phases={props.timing.phases} /></p>
    )
}