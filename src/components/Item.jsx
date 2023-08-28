import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

import {
    Card,
    CardBody,
    Badge
} from 'reactstrap';

export default function Item(props) {
    const content = props.content
    const navigate = useNavigate();

    return (
        <Card className='mb-5'>
            <Button color="light"
                border={props.border(content) ? props.border(content) : "secondary"}
                width={5}
                onClick={() => navigate(props.to)}>
                <CardBody>
                    <h2 className="text-dark">{content.name}</h2>
                    <h6 className="align-items-center">
                        <Badge className="text-light border border-2 border-light"
                            color="dark">
                            {content.expansion}
                        </Badge>
                        <Badge className={props.border(content) === "warning" ? " text-dark" : ""}
                            color={props.border(content) ? props.border(content) : "secondary"}>
                            {props.type(content) ? props.type(content) : null}
                        </Badge>
                    </h6>
                    {content.thumbnail ? <img alt={content.name + " Thumbnail"}
                        className='mx-auto d-block'
                        src={require(`../images/${content.thumbnail}`)}
                    /> : null}

                    <strong>{content.short}</strong>
                </CardBody>
            </Button>
        </Card>
    )
}