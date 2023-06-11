import { useState } from "react";
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import { ReactComponent as SearchLogo } from '../searchIcon.svg';
import GridBrowser from "../components/GridBrowser";
import Layout from '../components/Layout'
import Aliens from '../dataFiles/aliens.json';
import {
  Card,
  CardBody,
  // CardHeader,
  Row,
  Col,
  Badge,
  InputGroup,
  Input,
  InputGroupText,
  Form,
  FormGroup,
  Label,
  Button

} from 'reactstrap';

function filterAliens(aliens, search, expansions
  // , phases, exactPhases
) {
  if (expansions.includes("42nd Anniversary Edition")) {
    expansions.push("Base Set");
  }

  let filteredAliens = Object.entries(aliens);

  filteredAliens = filteredAliens.filter((alien) => alien[1].original.name.toLowerCase().includes(search.toLowerCase()))
  filteredAliens = filteredAliens.filter((alien) => expansions.includes(alien[1].original.expansion))
  // if (exactPhases){
  //   filteredAliens = filteredAliens.filter((alien) => phases === Object.keys(alien.phases).filter((phase) => alien.phases[phase]).map((phase) => phase))
  // } else {
  //   filteredAliens = filteredAliens.filter((alien) => phases.filter(phase => alien.phases[phase]).length > 0)
  // }
  return Object.fromEntries(filteredAliens)

}

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
String.prototype.hashCode = function () {
  var hash = 0,
    i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

// https://stackoverflow.com/questions/16801687/javascript-random-ordering-with-seed
function shuffle(array, seed) {                // <-- ADDED ARGUMENT
  let m = array.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(random(seed) * m--);        // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed                                     // <-- ADDED LINE
  }

  return array;
}

function random(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function giveAliens(aliens, player, seed, drawnCount) {
  const alienIDS = Object.keys(aliens)
  // seed = seed.toLowerCase()
  const shuffledAlienIDS = shuffle(alienIDS, seed.toLowerCase().hashCode())
  // console.log(shuffledAlienIDS)
  return shuffledAlienIDS.slice(player * drawnCount, player * drawnCount + drawnCount)

}

export default function Selection() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const searchParams = useSearchParams()[0];
  const [gameSeed, setGameSeed] = useState('');
  const [playerNumber, setPlayerNumber] = useState(undefined);
  const [drawnCount, setDrawnCount] = useState(2);
  const navigate = useNavigate();

  let submittedExpansions = ["Base Set", "42nd Anniversary Edition", "Cosmic Incursion", "Cosmic Conflict", "Cosmic Alliance", "Cosmic Storm", "Cosmic Dominion", "Cosmic Eons", "Cosmic Odyssey"];
  submittedExpansions = submittedExpansions.filter((expansion) => searchParams.get(expansion) !== 'false');
  const expansions = {
    "Base Set": useState(submittedExpansions.includes("Base Set")),
    "42nd Anniversary Edition": useState(submittedExpansions.includes("42nd Anniversary Edition")),
    "Cosmic Incursion": useState(submittedExpansions.includes("Cosmic Incursion")),
    "Cosmic Conflict": useState(submittedExpansions.includes("Cosmic Conflict")),
    "Cosmic Alliance": useState(submittedExpansions.includes("Cosmic Alliance")),
    "Cosmic Storm": useState(submittedExpansions.includes("Cosmic Storm")),
    "Cosmic Dominion": useState(submittedExpansions.includes("Cosmic Dominion")),
    "Cosmic Eons": useState(submittedExpansions.includes("Cosmic Eons")),
    "Cosmic Odyssey": useState(submittedExpansions.includes("Cosmic Odyssey"))
  }

  // const filteredAliens = filterAliens(Aliens.aliens, "", submittedExpansions)
  const [givenAliens, setGivenAliens] = useState({})

  let groupByN = (n, arr) => {
    let result = [];
    for (let i = 0; i < arr.length; i += n) result.push(arr.slice(i, i + n));
    return result;
  };
  // console.log(groupByN(4, Object.keys(expansions)))

  function Alien(props) {
    const alien = props.content
    return (
      <Card className='mb-5'>
        <Button type="button"
          color="danger"
          className="position-absolute top-0 end-0"
          aria-label="Close"
          onClick={() => {
            setGivenAliens(Object.fromEntries(Object.entries(givenAliens).filter(alien => alien[1] !== props.content)))
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </Button>
        <Link className={"btn border border-5 " +
          (alien.altTimeline ? "btn-dark " : "btn-light ") +
          (alien.alert === "Green" ? "border-success" : alien.alert === "Yellow" ? "border-warning" : "border-danger")
        } to={props.to} reloadDocument>
          <CardBody>
            <h2 className={!alien.altTimeline ? "text-dark" : null}>{alien.name}</h2>
            <h6 className="align-items-center">
              <Badge className={alien.alert === "Yellow" ? " text-dark" : ""}
                color={alien.alert === "Green" ? "success" : alien.alert === "Yellow" ? "warning" : "danger"}>
                {alien.alert}
              </Badge>
              {alien.altTimeline ? (
                <Badge className="ms-3 text-dark" color="light">
                  AT
                </Badge>) : null}
            </h6>
            <strong>{alien.short}</strong>
          </CardBody>
        </Link>
      </Card>
    )
  }

  return (
    <Layout>
      <h1 className='mb-4'>Aliens</h1>
      <Card className='mb-4 bg-light'>
        <CardBody>
          <Form onSubmit={
            (event) => {
              event.preventDefault();
              let usedSeed = gameSeed
              if (!usedSeed) {
                usedSeed = (Math.random() * 1000000).toString()
              }
              if (playerNumber) {
                const results = filterAliens(Aliens.aliens, "",
                  Object.keys(expansions).filter((expansion) => expansions[expansion][0]).map((expansion) => expansion));
                if (Object.keys(results).length > drawnCount * 8) {
                  let selectedAliens = giveAliens(results, playerNumber, usedSeed, Number(drawnCount));
                  // console.log(selectedAliens)
                  selectedAliens = selectedAliens.map((alien) => [alien, Aliens.aliens[alien]])
                  // console.log(selectedAliens)
                  // console.log(Object.fromEntries(selectedAliens))
                  setGivenAliens(Object.fromEntries(selectedAliens))
                }
              }
            }}>
            <Row>
              <h2 className='text-dark mb-3'>Game Settings</h2>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="gameSeed" className="h3 text-dark">
                    Shared Seed
                  </Label>
                  <p className="text-dark">Make this a memorable phrase and have all players put in the same seed to get no duplicate aliens. It is not case sensitive. Will be random if blank.</p>
                  <Input
                    id="gameSeed"
                    name="gameSeed"
                    placeholder="Game Seed"
                    type="text"
                    value={gameSeed}
                    onChange={(e) => setGameSeed(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="playerSelect" className="h3 text-dark">
                    Player Colour
                  </Label>
                  <p className="text-dark">Select the colour corresponding to your player colour. If your colour is not here, just make sure you select a colour no one else has selected.</p>
                  <Input
                    id="playerSelect"
                    name="playerSelect"
                    type="select"
                    onChange={(e) => setPlayerNumber(e.target.value)}
                    value={playerNumber}
                    defaultValue={"Please Select"}
                  >
                    <option value={undefined} disabled>
                      Please Select
                    </option>
                    <option value={1}>
                      Red
                    </option>
                    <option value={2}>
                      Blue
                    </option>
                    <option value={3}>
                      Green
                    </option>
                    <option value={4}>
                      Yellow
                    </option>
                    <option value={5}>
                      Purple
                    </option>
                    <option value={6}>
                      Orange
                    </option>
                    <option value={7}>
                      Black
                    </option>
                    <option value={8}>
                      White
                    </option>
                    <option value={0}>
                      Pink
                    </option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="playerSelect" className="h3 text-dark">
                    Number of Aliens Drawn
                  </Label>
                  <Input
                    id="playerSelect"
                    name="playerSelect"
                    type="Number"
                    // https://stackoverflow.com/questions/43687964/only-numbers-input-number-in-react
                    // onKeyPress={(event) => {
                    //   if (!/[0-9]/.test(event.key)) {
                    //     event.preventDefault();
                    //   }
                    // }}
                    onChange={(e) => {
                      if (e.target.value > 10) {
                        setDrawnCount(10)
                      } else {
                        setDrawnCount(e.target.value)
                      }
                    }}
                    value={drawnCount}
                  >
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Button type="submit">Submit</Button>
            </Row>
            <Row>
              <h2 className='text-dark mb-3'>Filters</h2>
            </Row>
            <Row>
              <Col>
                <h3 className='text-dark'>Expansions</h3>
                {groupByN(4, Object.keys(expansions)).map((row) => {
                  // console.log(row)
                  return (
                    <Row key={row}>
                      {row.map((expansion) => {
                        return (
                          <Col key={expansion}>
                            <FormGroup key={expansion} switch>
                              <Input type="switch" role="switch"
                                checked={expansions[expansion][0]}
                                onChange={() => expansions[expansion][1](!expansions[expansion][0])} />
                              <Label className="text-dark" check>
                                {expansion}
                              </Label>
                            </FormGroup>
                          </Col>
                        )
                      })}
                    </Row>
                  )
                })}
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Alien}
        url="/Aliens"
        content={givenAliens}
      />
    </Layout>
  )
}