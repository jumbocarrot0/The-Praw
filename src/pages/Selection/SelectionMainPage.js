import { useState, useEffect } from "react";
import { Button, Label, Input, Form } from 'reactstrap'

import Layout from '../../components/Layout'

import { getRandomAlien } from "../../supabaseAPI/getAlien"

import {
    createClient
} from '@supabase/supabase-js'



export default function SelectionMain() {

    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const [gameName, setGameName] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [connectionLive, setConnectionLive] = useState(false);
    const [channel, setChannel] = useState(null);


    useEffect(() => {
        if (connectionLive === "Host") {
            channel
                .on(
                    'presence',
                    { event: 'sync' },
                    () => {
                        const newState = channel.presenceState()
                        console.log('sync', newState)
                    }
                )
                .on(
                    'presence',
                    { event: 'join' },
                    ({ key, newPresences }) => {
                        console.log('join', key, newPresences)
                    }
                )
                .on(
                    'presence',
                    { event: 'leave' },
                    ({ key, leftPresences }) => {
                        console.log('leave', key, leftPresences)
                    }
                )
                .on(
                    'broadcast',
                    { event: 'aliens_dealt' },
                    (payload) => console.log(payload)
                )
                .subscribe(async (status) => {
                    if (status === 'SUBSCRIBED') {
                        const presenceTrackStatus = await channel.track({
                            user: playerName,
                            online_at: new Date().toISOString(),
                        })
                        console.log(presenceTrackStatus)
                    }
                })
        } else if (connectionLive === "Join") {
            channel
                .on(
                    'broadcast',
                    { event: 'aliens_dealt' },
                    (payload) => console.log('payload', payload)
                )
                .subscribe(async (status) => {
                    if (status === 'SUBSCRIBED') {
                        const presenceTrackStatus = await channel.track({
                            user: playerName,
                            online_at: new Date().toISOString(),
                        })
                        console.log(presenceTrackStatus)
                    }
                })
        }
    }, [connectionLive])


    // const [channel, setChannel] = useState(null)

    return (
        <Layout>
            <div>
                <h1>Create/Join Game</h1>
                <Label for="gameName">
                    Game Name
                </Label>
                <Input type="text" id="gameName"
                    value={gameName}
                    onChange={(e) => {
                        if (!/[^ A-Za-z0-9\-,'/+\\]/.test(e.target.value)) {
                            setGameName(e.target.value)
                        }
                    }} />
                <Label for="gameName">
                    Player Name
                </Label>
                <Input type="text" id="gameName"
                    value={playerName}
                    onChange={(e) => {
                        if (!/[^ A-Za-z0-9\-,'/+\\]/.test(e.target.value)) {
                            setPlayerName(e.target.value)
                        }
                    }} />
                <Button color="primary" disabled={connectionLive} onClick={
                    (event) => {
                        event.preventDefault();
                        const client = createClient(
                            'https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY
                        )
                        setChannel(client.channel(gameName));
                        setConnectionLive("Host")
                    }}>
                    Create
                </Button>
                <Button className="ms-3" color="secondary" disabled={connectionLive} onClick={
                    (event) => {
                        event.preventDefault();
                        const client = createClient(
                            'https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY
                        )
                        setChannel(client.channel(gameName));
                        setConnectionLive("Join")
                    }}>
                    Join
                </Button>
                <Button className="ms-3" color="secondary" onClick={
                    (event) => {
                        event.preventDefault();
                        getRandomAlien(8).then((data) => {
                            console.log(data)
                            channel.send({
                                type: 'broadcast',
                                event: 'send_aliens',
                                payload: {
                                    message: data
                                },
                            })
                        })
                    }}>
                    Send Aliens
                </Button>
            </div>
        </Layout >
    );
}