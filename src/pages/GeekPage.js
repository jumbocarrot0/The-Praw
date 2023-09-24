import React, { useEffect, useState } from 'react';
import { Button, Input, Form, FormFeedback } from 'reactstrap'

import Loading from '../components/Loading'

import { getRandomAlien } from '../supabaseAPI/getAlien'

export default function Geek() {

    const [alien, setAlien] = useState(undefined)

    const [guess, setGuess] = useState("")
    // const [correctGuesses, setCorrectGuesses] = useState(0)
    const [alienCount, setAlienCount] = useState(0)
    const [incorrect, setIncorrect] = useState(false)
    const [correct, setCorrect] = useState(false)

    useEffect(() => {
        getRandomAlien()
            .then((data) => {
                setAlien(data)
                // console.log(data)
            })
    }, [alienCount])

    return (
        <div>
            <Form className="hero text-center" onSubmit={
                (event) => {
                    event.preventDefault();
                    if (guess.toLocaleLowerCase() === alien.original.name.toLocaleLowerCase() ||
                        (alien.revised && guess.toLocaleLowerCase() === alien.revised.name.toLocaleLowerCase())) {
                        // alert("Correct");
                        setIncorrect(false)
                        setCorrect(true)
                        setAlien(undefined)
                        setAlienCount(e => e + 1)
                        setGuess("")
                    } else {
                        setCorrect(false)
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
                <Button className='mt-3 mb-2 w-25' color="primary">
                    Submit
                </Button>
                <br/>
                <Button className='mt-3 mb-2 w-25' color="secondary" onClick={() => {
                    setCorrect(false)
                    setIncorrect(false)
                    setAlienCount(e => e + 1)
                }}>
                    Next
                </Button>
                <FormFeedback className='fs-3' invalid>
                    Incorrect
                </FormFeedback>
                <FormFeedback className='fs-3' valid>
                    Correct
                </FormFeedback>
            </Form>
        </div>
    );
}