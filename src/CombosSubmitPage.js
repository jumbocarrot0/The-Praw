import { useState, useEffect } from "react";
import {
  Button, Row, Col, Form, Label, Input, FormGroup, FormFeedback
} from 'reactstrap';
// import { Link } from "react-router-dom"
// import Loading from '../components/Loading'

import { getAllAliens } from "../supabaseAPI/getAlien"
import { uploadCombo } from "../supabaseAPI/getCombo"

import ComboImage from '../components/ComboImage';

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
        value={props.comboAliens[props.id - 1][0]}
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
  // let alienTable = useMemo(() => {
  //   console.log(aliens)
  //   if (Object.keys(aliens).length > 0) {
  //     return Object.fromEntries(aliens);
  //   } else {
  //     return {}
  //   }
  // }, [])

  let alienTable = {}
  if (Object.keys(aliens).length > 0) {
    alienTable = Object.fromEntries(aliens);
  }

  let canvasImg = null

  // useEffect(() => {
  //   canvasImg = <ComboImage
  //     style={{ maxHeight: '50vh' }}
  //     className="img-fluid rounded-5"
  //     name={comboName ?? ""}
  //     // comboAliens={[]}
  //     comboAliens={comboAliens.map(v => alienTable[v[0]] ?? null)}
  //   // comboAliens={comboAliens.map(v => v[0])}
  //   />
  // }, [])

  return (
    <div>
      <Row>
        <Col sm={6}>
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
                  className="w-100 mb-3"
                  color="primary"
                  disabled={loading}
                >
                  Submit!
                </Button>
                <Button
                  className="w-100"
                  color="danger"
                  disabled={loading}
                  onClick={() => {
                    setLoading(true);
                    for (let i = 0; i < 8; i++){
                      comboAliens[i][1](Math.floor(Math.random() * aliens.length))
                    }
                    setLoading(false);
                  }
                  }
                >
                  Random!
                </Button>
              </Form>
            </div>
          }
        </Col>
        <Col sm={6}>
          <div className="d-flex justify-content-center">
            {canvasImg}
            <ComboImage
              style={{ maxHeight: '50vh' }}
              className="img-fluid rounded-5"
              name={comboName ?? ""}
              // comboAliens={[]}
              comboAliens={comboAliens.map(v => alienTable[v[0]] ?? null)}
            // comboAliens={comboAliens.map(v => v[0])}
            />
          </div>
        </Col>
      </Row>
      {/* <Row className="row mt-5">
        <div className="d-flex justify-content-center">
          <Link className="btn btn-primary w-50" to="https://forms.gle/Xg7aXQsrtitM1dFw9" role="button" target="_blank" rel="external">Submit your own Combo!</Link>
        </div>
      </Row> */}
    </div>
  );
}