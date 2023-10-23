import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap'

import Searchbar from '../components/Searchbar'

function PlayerInput(props) {

    const colors = ["bg-primary text-white",
        'bg-danger text-white',
        'bg-success text-white',
        'bg-warning text-dark',
        'bg-indigo text-white',
        'bg-orange text-dark',
        'bg-black text-white',
        'bg-white text-dark',
        'bg-pink text-dark']

    return (<FormGroup row>
        <Label className="text-white text-end" for="player1Name" sm={3}>
            Player Name
        </Label>
        <Col sm={6}>
            <Input id="player1Name"
                value={props.name}
                onChange={(e) => {
                    if (!/[^ A-Za-z0-9\-,'/+\\!?#"]/.test(e.target.value)) {
                        props.setName(e.target.value)
                    }
                }} />
        </Col>
        <Col sm={3}>
            <Input
                id="player1Color"
                type="select"
                className={colors[props.color]}
                value={props.color}
                onChange={(e) => {
                    if (!/[^0-9]/.test(e.target.value)) {
                        props.setColor(e.target.value)
                    }
                }}
            >
                <option value={0}>
                    Blue
                </option>
                <option value={1}>
                    Red
                </option>
                <option value={2}>
                    Green
                </option>
                <option value={3}>
                    Yellow
                </option>
                <option value={4}>
                    Purple
                </option>
                <option value={5}>
                    Orange
                </option>
                <option value={6}>
                    Black
                </option>
                <option value={7}>
                    White
                </option>
                <option value={8}>
                    Pink
                </option>
            </Input>
        </Col>
    </FormGroup>)
}

export default function CampaignGeneratePage() {

    const randomTitlePlaceholders = ["Something Cool", "Something Funny", "Something Random", "Something Bizarre", "Some random pun"]
    const [randomTitlePlaceholder, setRandomTitlePlaceholder] = useState(randomTitlePlaceholders[Math.floor(Math.random() * randomTitlePlaceholders.length)])

    const [loading, setLoading] = useState(false)

    const [gameName, setGameName] = useState("");
    const [playerCount, setPlayerCount] = useState(5);

    const [player1Name, setPlayer1Name] = useState("");
    const [player1Color, setPlayer1Color] = useState(0);
    const [player2Name, setPlayer2Name] = useState("");
    const [player2Color, setPlayer2Color] = useState(1);
    const [player3Name, setPlayer3Name] = useState("");
    const [player3Color, setPlayer3Color] = useState(2);
    const [player4Name, setPlayer4Name] = useState("");
    const [player4Color, setPlayer4Color] = useState(3);
    const [player5Name, setPlayer5Name] = useState("");
    const [player5Color, setPlayer5Color] = useState(4);
    const [player6Name, setPlayer6Name] = useState("");
    const [player6Color, setPlayer6Color] = useState(5);
    const [player7Name, setPlayer7Name] = useState("");
    const [player7Color, setPlayer7Color] = useState(6);
    const [player8Name, setPlayer8Name] = useState("");
    const [player8Color, setPlayer8Color] = useState(7);

    return (
        <div>
            <h1 className="text-center">Generate Campaign Log</h1>
            <div className='d-flex justify-content-center'>
                <Form onSubmit={(event) => event.preventDefault()}>
                    <FormGroup>
                        <Label className="fs-3 text-white" for="campaignTitle">
                            Campaign Title
                        </Label>
                        <p>This is optional, a random name will be generated if you don't give one.</p>
                        <Input placeholder={`${randomTitlePlaceholder}...`}
                            value={gameName}
                            onChange={(e) => {
                                if (!/[^ A-Za-z0-9\-,'/+\\!?#"]/.test(e.target.value)) {
                                    setGameName(e.target.value)
                                }
                            }}
                            id="campaignTitle" />
                    </FormGroup>
                    <FormGroup row>
                        <Label className="text-white text-end" for="playerCount" sm={3}>
                            # of Players
                        </Label>
                        <Col sm={9}>
                            <Input id="playerCount" type="number"
                                value={playerCount}
                                onChange={(e) => {
                                    if (!/[^0-9"]/.test(e.target.value)) {
                                        if (e.target.value >= 3 && e.target.value <= 8) {
                                            setPlayerCount(e.target.value)
                                        }
                                    }
                                }}
                            />
                        </Col>
                    </FormGroup>
                    <PlayerInput name={player1Name} setName={setPlayer1Name} color={player1Color} setColor={setPlayer1Color} />
                    <PlayerInput name={player2Name} setName={setPlayer2Name} color={player2Color} setColor={setPlayer2Color} />
                    <PlayerInput name={player3Name} setName={setPlayer3Name} color={player3Color} setColor={setPlayer3Color} />
                    {playerCount >= 4 ? <PlayerInput name={player4Name} setName={setPlayer4Name} color={player4Color} setColor={setPlayer4Color} /> : null}
                    {playerCount >= 5 ? <PlayerInput name={player5Name} setName={setPlayer5Name} color={player5Color} setColor={setPlayer5Color} /> : null}
                    {playerCount >= 6 ? <PlayerInput name={player6Name} setName={setPlayer6Name} color={player6Color} setColor={setPlayer6Color} /> : null}
                    {playerCount >= 7 ? <PlayerInput name={player7Name} setName={setPlayer7Name} color={player7Color} setColor={setPlayer7Color} /> : null}
                    {playerCount >= 8 ? <PlayerInput name={player8Name} setName={setPlayer8Name} color={player8Color} setColor={setPlayer8Color} /> : null}


                    <Button
                        className="w-100"
                        color="primary"
                        disabled={loading}
                    >
                        Submit!
                    </Button>
                </Form>
            </div>
        </div>
    );
}