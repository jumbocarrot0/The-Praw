import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap'
import { createLobby, joinLobby } from "../../supabaseAPI/getSelection";

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
            Your Player Name
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

export default function SelectionMain() {

    const randomTitlePlaceholders = ["Something Cool", "Something Funny", "Something Random", "Something Bizarre", "Some random pun"]
    const [randomTitlePlaceholder, setRandomTitlePlaceholder] = useState(randomTitlePlaceholders[Math.floor(Math.random() * randomTitlePlaceholders.length)])

    const [loading, setLoading] = useState(false)

    const [gameName, setGameName] = useState("");
    const [playerCount, setPlayerCount] = useState(5);

    const [player1Name, setPlayer1Name] = useState("");
    const [player1Color, setPlayer1Color] = useState(0);

    function joinGame(){
        joinLobby(gameName, player1Name, player1Color)
    }
    
    function createGame(){
        const successful = createLobby(gameName)
        if (successful){
            joinLobby(gameName, player1Name, player1Color)
        }
    }

    return (
        <div>
            <h1 className="text-center">Alien Selection</h1>
            <div className='d-flex justify-content-center'>
                <Form onSubmit={(event) => {
                    event.preventDefault();
                }}>
                    <FormGroup>
                        <Label className="fs-3 text-white" for="gameName">
                            Game Name
                        </Label>
                        <p>This is optional, a random name will be generated if you don't give one.</p>
                        <Input placeholder={`${randomTitlePlaceholder}...`}
                            value={gameName}
                            onChange={(e) => {
                                if (!/[^ A-Za-z0-9\-,'/+\\!?#"]/.test(e.target.value)) {
                                    setGameName(e.target.value)
                                }
                            }}
                            id="gameName" />
                    </FormGroup>
                    <FormGroup row>
                        <Label className="text-white text-end" for="playerCount" sm={3}>
                            Max # of Players
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
                    <PlayerInput index={1} name={player1Name} setName={setPlayer1Name} color={player1Color} setColor={setPlayer1Color} />

                    <Button
                        className="w-100 mb-3"
                        color="primary"
                        disabled={loading}
                        onClick={() => joinGame()}
                    >
                        Join Lobby!
                    </Button>

                    <Button
                        className="w-100"
                        color="danger"
                        disabled={loading}
                        onClick={() => createGame()}
                    >
                        Create Lobby!
                    </Button>
                </Form>
            </div>
        </div>
    );
}