import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col, Table } from 'reactstrap'
import { getLobby } from "../../supabaseAPI/getSelection";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";

export default function SelectionMain() {

    const { gameID } = useParams()

    const [lobby, setLobby] = useState(undefined)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getLobby(gameID)
            .then(data => {
                console.log(data)
                setLobby(data)
            })
    }, [gameID])


    if (lobby === undefined) {
        return (<div>
            <Loading />
        </div>)

    } else {
        return (<div>
            <h1 className="text-center">Game Lobby - {lobby.name}</h1>
            <Form onSubmit={(event) => {
                event.preventDefault();
            }}>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        Players
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    lobby.players.map(player => (
                                        <tr key={player.playerID}>
                                            <td>
                                            <p>{player.name}</p>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Form>
        </div>)
    }
}