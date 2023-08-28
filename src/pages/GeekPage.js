import React, { useEffect, useState } from 'react';
import { Button, Input, Form, FormFeedback } from 'reactstrap'

import Layout from '../components/Layout'
import Loading from '../components/Loading'

import { getRandomAlien } from '../supabaseAPI/getAlien'

export default function Home() {

    const [alien, setAlien] = useState(undefined)

    const [guess, setGuess] = useState("")
    const [correctGuesses, setCorrectGuesses] = useState("")
    const [incorrect, setIncorrect] = useState(false)
    const [correct, setCorrect] = useState(false)

    useEffect(() => {
        getRandomAlien()
            .then((data) => {
                setAlien(data)
                console.log(data)
            })
    }, [correctGuesses])

    return (
        <Layout>
            <Form className="hero text-center" onSubmit={
                (event) => {
                    event.preventDefault();
                    if (guess.toLocaleLowerCase() === alien.original.name.toLocaleLowerCase() ||
                        (alien.revised && guess.toLocaleLowerCase() === alien.revised.name.toLocaleLowerCase())) {
                        // alert("Correct");
                        setCorrect(true)
                        setAlien(undefined)
                        setCorrectGuesses(e => e + 1)
                    } else {
                        setIncorrect(true)
                        // alert("Incorrect");
                    }
                }}>
                <h1>Geek Practice</h1>
                <div>
                    {alien === undefined
                        ?
                        <Loading />
                        :
                        <p className='mb-4'><strong className='fs-3 text-light'>{alien.original.short}</strong></p>
                    }
                </div>
                <Input
                    className="fs-5 mt-3"
                    placeholder="Guess this alien's name"
                    value={guess}
                    onChange={(e) => {
                        if (!/[^ A-Za-z0-9\-,'/+\\]/.test(e.target.value)) {
                            if (incorrect) {
                                setIncorrect(false)
                            }
                            if (correct) {
                                setCorrect(false)
                            }
                            setGuess(e.target.value)
                        }
                    }}
                    invalid={incorrect}
                    valid={correct} />
                <Button className='mt-3 mb-2' color="primary">
                    Submit
                </Button>
                <FormFeedback className='fs-3' invalid>
                    Incorrect
                </FormFeedback>
                <FormFeedback className='fs-3' valid>
                    Correct
                </FormFeedback>
            </Form>
        </Layout>
    );
}