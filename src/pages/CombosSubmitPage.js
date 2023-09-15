import { useState, useEffect } from "react";
import combosData from '../dataFiles/combos.json';
import {
  Button, Table, Row, Col, Form, Label, Input, FormGroup, FormFeedback
} from 'reactstrap';
import { Link } from "react-router-dom"
import Layout from '../components/Layout'
import Loading from '../components/Loading'

import { getAllAliens } from "../supabaseAPI/getAlien"
import { uploadCombo } from "../supabaseAPI/getCombo"

function Combo(props) {
  // console.log(props.Name)
  // console.log(props.Aliens)
  return (
    <Table dark className="text-center w-50 th-w-50">
      <thead>
        <tr>
          <th colSpan={2}>
            <h2>{props.name}</h2>
            <strong>{props.author}</strong>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr><th scope="row" rowSpan={3} className="align-middle">3-Player</th>
          <td>{props.alien1data.original.name}</td></tr>
        <tr><td>{props.alien2data.original.name}</td></tr>
        <tr><td>{props.alien3data.original.name}</td></tr>
        <tr><th scope="row">4-Player</th><td>{props.alien4data.original.name}</td></tr>
        <tr><th scope="row">5-Player</th><td>{props.alien5data.original.name}</td></tr>
        <tr><th scope="row">6-Player</th><td>{props.alien6data.original.name}</td></tr>
        <tr><th scope="row">7-Player</th><td>{props.alien7data.original.name}</td></tr>
        <tr><th scope="row">8-Player</th><td>{props.alien8data.original.name}</td></tr>
      </tbody>
    </Table>
  )
}

function RandomCombo() {
  let comboIndex = Math.floor(Math.random() * combosData.length);
  return combosData[comboIndex];
}

function AlienSelect(props) {
  return (
    props.aliens.map(entry => {
      return (
        <option key={entry[0]} value={entry[0]}>
          {entry[1].original.name} {entry[1].original.altTimeline ? "(AT)" : null}
        </option>
      )
    })
  )
}

function AlienInput(props) {
  return (
    <FormGroup>
      <Label for={`Alien${props.id}`}>
        {props.id === 1 ? "1st Alien" : props.id === 2 ? "2nd Alien" : props.id === 3 ? "3rd Alien" : `${props.id}th Alien`}
      </Label>
      <Input
        id={`Alien${props.id}`}
        name={`Alien${props.id}`}
        type="select"
        onChange={(e) => {
          if (!/[^0-9]/.test(e.target.value)) {
            // console.log(e.target.value)
            props.comboAliens[props.id - 1][1](e.target.value)
          }
        }}
      >
        <AlienSelect aliens={props.aliens} />
      </Input>
    </FormGroup>
  )
}

export default function CombosSubmit() {

  const [aliens, setAliens] = useState([])
  useEffect(() => {
    getAllAliens()
      .then((data) => {
        data = Object.entries(data);
        data.sort(function (a, b) {
          // console.log(a[1].original.name, b[1].original.name)
          if (a[1].original.name.toLocaleLowerCase() < b[1].original.name.toLocaleLowerCase()) {
            return -1;
          }
          else if (a[1].original.name.toLocaleLowerCase() > b[1].original.name.toLocaleLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        })
        return data
      })
      .then(data => setAliens(data))
  }, [])

  const [comboName, setComboName] = useState("")
  const [comboAuthor, setComboAuthor] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const comboAliens = [
    useState(0),
    useState(1),
    useState(2),
    useState(3),
    useState(4),
    useState(5),
    useState(6),
    useState(7)
  ]

  const [comboNameError, setComboNameError] = useState(false)
  const [comboAuthorError, setComboAuthorError] = useState(false)

  // console.log(comboAliens)

  return (
    <Layout title="Combos">
      <Row>
        <h1 className="text-center">Submit your Combo!</h1>
        {submitted ? <div className="text-center">
          <p>Your Combo has been submitted! It will need to be manually verified first, but then it will appear on this site's combo generator!</p>
          <Button
            color="primary"
            disabled={!submitted}
            onClick={() => {
              setComboName("");
              setComboAuthor("");
              setSubmitted(false);
              setLoading(false);
            }}
          >
            Press here to make another!
          </Button>
        </div> :
          <div className="d-flex justify-content-center">
            <Form
              onSubmit={async (event) => {


                event.preventDefault();

                if (comboName.length === 0) {
                  setComboNameError(true)
                }
                if (comboAuthor.length === 0) {
                  setComboAuthorError(true)
                }
                if (comboName.length !== 0 && comboAuthor.length !== 0) {
                  setLoading(true);
                  uploadCombo(comboName, comboAuthor, comboAliens.map(alien => alien[0]))
                    .then(_ => setSubmitted(true))
                }

                return false
              }
              }
            >

              <Input placeholder="Combo Name" invalid={comboNameError && comboName.length === 0}
                value={comboName}
                onChange={(e) => {
                  if (!/[^ A-Za-z0-9\-,'/+\\!?#"]/.test(e.target.value)) {
                    setComboName(e.target.value)
                  }
                }} />
              <FormFeedback>
                Please add a name
              </FormFeedback>
              <Input placeholder="Author" invalid={comboAuthorError && comboAuthor.length === 0}
                value={comboAuthor}
                onChange={(e) => {
                  if (!/[^ A-Za-z0-9\-,'/+\\!?#"]/.test(e.target.value)) {
                    setComboAuthor(e.target.value)
                  }
                }} />
              <FormFeedback>
                Please add an author
              </FormFeedback>
              <Row>
                <Col>
                  <AlienInput id={1} comboAliens={comboAliens} aliens={aliens} />
                </Col>
                <Col>
                  <AlienInput id={2} comboAliens={comboAliens} aliens={aliens} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <AlienInput id={3} comboAliens={comboAliens} aliens={aliens} />
                </Col>
                <Col>
                  <AlienInput id={4} comboAliens={comboAliens} aliens={aliens} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <AlienInput id={5} comboAliens={comboAliens} aliens={aliens} />
                </Col>
                <Col>
                  <AlienInput id={6} comboAliens={comboAliens} aliens={aliens} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <AlienInput id={7} comboAliens={comboAliens} aliens={aliens} />
                </Col>
                <Col>
                  <AlienInput id={8} comboAliens={comboAliens} aliens={aliens} />
                </Col>
              </Row>
              <Button
                className="w-100"
                color="primary"
                disabled={loading}
              >
                Submit!
              </Button>
            </Form>
          </div>
        }
      </Row>
      {/* <Row className="row mt-5">
        <div className="d-flex justify-content-center">
          <Link className="btn btn-primary w-50" to="https://forms.gle/Xg7aXQsrtitM1dFw9" role="button" target="_blank" rel="external">Submit your own Combo!</Link>
        </div>
      </Row> */}
    </Layout>
  );
}