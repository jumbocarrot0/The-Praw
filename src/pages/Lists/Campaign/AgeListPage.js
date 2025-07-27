
import { Link } from 'react-router-dom';
import GridBrowser from "../../../components/GridBrowser";

import { useState } from 'react';

import PartStyle, { VERSIONS, MODES } from '../../../components/PartStyle'

import {
    Modal,
    ModalHeader,
    ModalBody,
    Card,
    CardBody,
    Badge
} from 'reactstrap';
import { useRouteLoaderData } from 'react-router-dom';

function AgeItem(props) {

    const Ages = useRouteLoaderData("ages")

    const content = props.content

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal);

    return (
        <>
            {content.type === "Standard"
                ?
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag={'h2'}>{content.name}...</ModalHeader>
                    <ModalBody>
                        <p>Use the following alien selection method:</p>
                        <Link to={`/Variants/Campaign/selectionMethods#${Ages.selectionMethods[content.selectionMethodID].name.replaceAll(' ', '_')}`}>{Ages.selectionMethods[content.selectionMethodID].name}</Link>
                    </ModalBody>
                    <ModalHeader tag={'h2'}>...{content.name2}</ModalHeader>
                    <ModalBody>
                        <p>Add the following variant(s):</p>
                        {
                            content.variants.map((variant, index) => <span key={index}>
                                {index !== 0 ? variant.Subvariant ? " with " : " and " : null}<Link to={variant.Link}>{variant.Name}</Link>
                            </span>
                            )
                        }
                        <br />
                        <br />
                        <ul>
                            {
                                Object.keys(content.scoring).map((score) => <li key={score}>{content.scoring[score]} points {Ages.scoring[score].name}</li>
                                )
                            }
                        </ul>
                    </ModalBody>
                    <ModalHeader tag={'h2'}>Master Card</ModalHeader>
                    <ModalBody>
                        <Link to={`/Variants/Campaign/MasterCards/${content.masterID}`}>{Ages.master[content.masterID].name}</Link>
                    </ModalBody>
                </Modal>
                :
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag={'h2'}>{content.name}</ModalHeader>
                    <ModalBody>
                        {content.body}
                    </ModalBody>
                </Modal>
            }

            <Card className='mb-5'>
                <Link color="light"
                    className={`btn btn-light border-5 border-${props.border(content) ? props.border(content) : "secondary"}`}
                    // border={props.border(content) ? props.border(content) : "secondary"}
                    width={5}
                    onClick={toggle}
                >
                    <CardBody>
                        {content.type === "Standard"
                            ?
                            <h2 className="text-dark">{content.name}...<br />
                                ...{content.name2}</h2>
                            :
                            <h2 className="text-dark">{content.name}</h2>
                        }
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
                            src={require(`../../../images/${content.thumbnail}`)}
                            style={{ "maxHeight": "72px" }}
                        /> : null}

                        <strong>{content.short}</strong>
                    </CardBody>
                </Link>
            </Card>
        </>
    )
}

export default function AgesPage() {

    const Ages = useRouteLoaderData("ages")
    console.log(Ages)
    
    function handleParts(part, i) {
        return part.value.split(' ').map((word, j) => <PartStyle key={`${i}${j}`} part={part} viewMode={0} tab={0}>{j === 0 ? `${word}` : ` ${word}`}</PartStyle>)
    }
    
    return (
        <div>
            <h1 className='mb-4'>Ages</h1>
            <p className="text-light">Ages are an official component of the Campaign mode in Cosmic Odyssey. 11 Age cards are included in Cosmic Odyssey, and it has been suggested that any newly released official variants in future expansions will include an age card.
                <br /><br />
                Most age cards are split into two halves. The top half determines the alien selection method, and the both half the variant and scoring. There is one age card that acts as a modifier to another age card. Age cards can also be used in a single game outside of a campaign setting.
                <br /><br />
                For more details on how these fit into a campaign, read the rules on the <Link to="../">campagin page</Link>.
            </p>
            <hr className="border border-light border-2 opacity-100 mb-5" />
            <GridBrowser cardTemplate={AgeItem}
                noSort={true}
                url="/Variants/Campaign/Ages"
                content={Ages.ages}
                border={() => "danger"}
                type={(age) => { return age.type }}
                width={4}
            />
        </div>
    );
}