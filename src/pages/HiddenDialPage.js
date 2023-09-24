import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { Button, Row, Col } from 'reactstrap'

function mod(n, m) {
    return ((n % m) + m) % m;
}

function ForeignAidIcon(props) {
    return (
        <img alt={"Foreign Aid"}
            className='mx-auto mt-3'
            style={{ imageRendering: "crisp-edges", width: `${14 * 5}px` }}
            src={require(`../images/Foreign Aid Icon.png`)}
        />
    )
}

export default function HiddenDialPage() {

    const allianceSides = ["Offense", "Defense", "Neither", "Special"]

    const [allianceSideIndex, setAllianceSideIndex] = useState(0)
    const [allianceAmountIndex, setAllianceAmountIndex] = useState(1)


    return (
        <div className="text-center">
            <h1>Digital Alliance Dial</h1>
            <Link 
            // className="pe-2" 
            to="/Variants/Dials">Rules</Link>
            {/* <Link className="ps-2" onClick={() => {}}>Help</Link> */}
            <div className="mx-auto" style={{ maxWidth: "600px" }}>
                <Row className='align-items-center' style={{ height: "20vh" }}>
                    <Col className='fs-1'>
                        <Button color='primary' className='border border-light border-5' size="lg" onClick={() => setAllianceSideIndex(e => mod((e - 1), allianceSides.length))}><samp>-</samp></Button>
                    </Col>
                    <Col className='fs-big'>
                        <p>{allianceSides[allianceSideIndex]}</p>
                    </Col>
                    <Col className='fs-1'>
                        <Button color='primary' className='border border-light border-5' size="lg" onClick={() => setAllianceSideIndex(e => mod((e + 1), allianceSides.length))}><samp>+</samp></Button>
                    </Col>
                </Row>
                <Row className='align-items-center' style={{ height: "25vh" }}>
                    <Col className='fs-1'>
                        <Button color='primary' className='border border-light border-5' size="lg"
                            onClick={() => setAllianceAmountIndex(e => Math.max(e - 1, -1))}
                            disabled={allianceAmountIndex === -1 || allianceSideIndex === 2}
                        >
                            <samp>-</samp>
                        </Button>
                    </Col>
                    <Col style={{ fontSize: "5rem" }}>
                        <p>{
                            allianceSideIndex === 2 ? "-" :
                                allianceAmountIndex === -1 ? "★" :
                                    allianceAmountIndex === 0 ? <ForeignAidIcon /> :
                                        allianceAmountIndex
                        }
                        </p>
                    </Col>
                    <Col className='fs-1'>
                        <Button color='primary' className='border border-light border-5' size="lg"
                            onClick={() => setAllianceAmountIndex(e => e + 1)}
                            disabled={allianceSideIndex === 2}
                        >
                            <samp>+</samp>
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>

    );
}