import {
    Spinner
} from 'reactstrap';

export default function Loading(Props) {
    return (
        <div className="d-flex justify-content-center">
            <Spinner
                color = {Props.color ? Props.color : "light"}
                className=""
                style={{
                    height: '3rem',
                    width: '3rem'
                }}>
                Loading...
            </Spinner>
        </div>
    )
}