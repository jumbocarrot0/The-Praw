import { useState } from "react";
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import { ReactComponent as SearchLogo } from '../searchIcon.svg';
import GridBrowser from "../components/GridBrowser";
import Layout from '../components/Layout'
import Phases from '../components/Phases';
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
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormFeedback

} from 'reactstrap';

function filterAliens(aliens, search, expansions, revised, alerts
  // , phases, exactPhases
) {

  search = search || ""
  expansions = expansions || ["Base Set", "42nd Anniversary Edition", "Cosmic Incursion", "Cosmic Conflict", "Cosmic Alliance", "Cosmic Storm", "Cosmic Dominion", "Cosmic Eons", "Cosmic Odyssey"]
  revised = revised || false
  alerts = alerts || ["Green", "Yellow", "Red"]

  if (expansions.includes("42nd Anniversary Edition")) {
    expansions.push("Base Set");
  }

  let filteredAliens = Object.entries(aliens);

  // console.log(filteredAliens)
  // console.log(revised)

  if (revised) {
    filteredAliens = filteredAliens.filter(alien => alien[1].revised ? alien[1].revised.name.toLowerCase().includes(search.toLowerCase()) : alien[1].original.name.toLowerCase().includes(search.toLowerCase()))
    filteredAliens = filteredAliens.filter(alien => alien[1].revised ? expansions.includes(alien[1].revised.expansion) : expansions.includes(alien[1].original.expansion))
    filteredAliens = filteredAliens.filter(alien => alien[1].revised ? alerts.includes(alien[1].revised.alert) : alerts.includes(alien[1].original.alert))
  } else {
    filteredAliens = filteredAliens.filter(alien => alien[1].original.name.toLowerCase().includes(search.toLowerCase()))
    filteredAliens = filteredAliens.filter(alien => expansions.includes(alien[1].original.expansion))
    filteredAliens = filteredAliens.filter(alien => alerts.includes(alien[1].original.alert))
  }
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

function giveAliens(aliens, player, seed, drawnCount, preventBans) {
  const alienIDS = Object.keys(aliens)
  // seed = seed.toLowerCase()
  let shuffledAlienIDS = shuffle(alienIDS, seed.toLowerCase().hashCode())
  if (preventBans) {
    const bans = []
    alienIDS.forEach(alienID => {
      if (aliens[alienID].original.bans) {
        aliens[alienID].original.bans.forEach(ban => {
          bans.push([alienID, ban])
        }
        )
      }
    })
    console.log(shuffledAlienIDS)
    bans.forEach(ban => {
      if (shuffledAlienIDS.includes(ban[0]) && shuffledAlienIDS.includes(ban[1])) {
        if (shuffledAlienIDS.indexOf(ban[0]) > shuffledAlienIDS.indexOf(ban[1])) {
          shuffledAlienIDS = shuffledAlienIDS.filter(alienID => alienID !== ban[0])
        } else {
          shuffledAlienIDS = shuffledAlienIDS.filter(alienID => alienID !== ban[1])
        }
      }
    })
  }

  // console.log(shuffledAlienIDS)
  return shuffledAlienIDS.slice(player * drawnCount, player * drawnCount + drawnCount)
}

function AlienViewButton(props) {
  const alien = props.content
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // console.log(alien)

  return (<div>
    <Modal isOpen={modal} toggle={toggle} {...props} scrollable>
      <ModalHeader toggle={toggle}>{alien.name}</ModalHeader>
      <ModalBody>
        <h3>{alien.alert}</h3>
        {alien.gameSetup ? <p><strong>Game Setup:</strong> {alien.gameSetup}</p> : null}
        <p><strong>{alien.powerName}</strong> {alien.powerBody}</p>
        {alien.powerSpecialName ? <p><strong>{alien.powerSpecialName}</strong> {alien.powerSpecialBody}</p> : null}
        <br />
        <p><em>{alien.history}</em></p>
        <p>({alien.powerTiming.player}) ({alien.powerTiming.choice}) <Phases phases={alien.powerTiming.phases} /></p>
        <br />
        <h3>Wild Flare</h3>
        <p>{alien.wildBody}</p>
        <p>({alien.wildTiming.player}) <Phases phases={alien.wildTiming.phases} flare /></p>
        <br />
        <h3>Super Flare</h3>
        <p>{alien.superBody}</p>
        <p>({alien.superTiming.player}) <Phases phases={alien.superTiming.phases} flare /></p>
        <br />
        <br />{
          alien.wildClassicBody ? (
            <div>
              <h3>Classic Wild Flare</h3>
              <p>{alien.wildClassicBody}</p>
              <p>({alien.wildClassicTiming.player}) <Phases phases={alien.wildClassicTiming.phases} flare /></p>
              <br />
              <h3>Classic Super Flare</h3>
              <p>{alien.superClassicBody}</p>
              <p>({alien.superClassicTiming.player}) <Phases phases={alien.superClassicTiming.phases} flare /></p>
            </div>
          ) : null
        }
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
    <Button color="primary" onClick={toggle}>
      View
    </Button>
  </div>)
}

export default function Selection() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const searchParams = useSearchParams()[0];
  const [gameSeed, setGameSeed] = useState('');
  const [playerNumber, setPlayerNumber] = useState(undefined);
  const [playerNumberError, setPlayerNumberError] = useState(false);
  const [drawnCount, setDrawnCount] = useState(2);
  const [revised, setRevised] = useState(true);
  const [useATAliens, setUseATAliens] = useState(false);
  const [useATAliensAndOG, setUseATAliensAndOG] = useState(false);
  const [excludeAliensSearch, setExcludeAliensSearch] = useState("");
  const [excludedAliens, setExcludedAliens] = useState([]);
  const [alerts, setAlerts] = useState(["Green", "Yellow", "Red"]);
  const [useGameSetup, setUseGameSetup] = useState(true);
  const [preventBans, setPreventBans] = useState(true);

  const [errorModal, setErrorModal] = useState(false);

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
      <Card className={"mb-5 border border-5 position-relative text-center " +
        (alien.alert === "Green" ? "border-success" : alien.alert === "Yellow" ? "border-warning" : "border-danger")
      } color={alien.altTimeline ? "dark" : "light"}>
        <Button type={alien.altTimeline ? "dark" : "light"}
          color="danger"
          className="position-absolute top-0 start-100 translate-middle rounded-circle border border-light border-4"
          aria-label="Close"
          onClick={() => {
            if (props.revised) {
              setGivenAliens(Object.fromEntries(Object.entries(givenAliens).filter(alien => alien[1].revised ? alien[1].revised !== props.content : alien[1].original !== props.content)))
            } else {
              setGivenAliens(Object.fromEntries(Object.entries(givenAliens).filter(alien => alien[1].original !== props.content)))
            }
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="28" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </Button>
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
            {alien.gameSetup !== "" ? (
              <Badge className="ms-3 text-light" color="info">
                Game Setup
              </Badge>) : null}
          </h6>
          <p><strong className={!alien.altTimeline ? "text-dark" : "text-light"}>{alien.short}</strong></p>
          <AlienViewButton content={alien} />
        </CardBody>
      </Card>
    )
  }

  return (
    <Layout>
      <h1 className='mb-4'>Aliens</h1>
      <Modal isOpen={errorModal} toggle={() => setErrorModal(!errorModal)}>
        <ModalHeader toggle={() => setErrorModal(!errorModal)}>Invalid Filters</ModalHeader>
        <ModalBody>
          Your selected filters resulted in too few aliens to give to you
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => setErrorModal(!errorModal)}>
            Go Back
          </Button>
        </ModalFooter>
      </Modal>
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
                setPlayerNumberError(false)
                let results = Object.entries(filterAliens(Aliens.aliens, "",
                  Object.keys(expansions).filter((expansion) => expansions[expansion][0]).map((expansion) => expansion), revised, alerts));
                results = results.filter(alien => !excludedAliens.includes(alien[0]))
                if (!useGameSetup) {
                  results = results.filter(alien => revised ? alien[1].revised.gameSetup === "" : alien[1].original.gameSetup === "")
                }
                if (!useATAliens) {
                  results = results.filter(alien => !alien[1].original.altTimeline)
                } else if (!useATAliensAndOG) {
                  results = results.filter(alien => !alien[1].original.altTimelineID)
                }
                results = Object.fromEntries(results)
                let selectedAliens = giveAliens(results, playerNumber, usedSeed, Number(drawnCount), preventBans);
                selectedAliens = selectedAliens.map((alien) => [alien, Aliens.aliens[alien]])
                if (selectedAliens.length < Number(drawnCount)) {
                  setErrorModal(true)
                } else {
                  setGivenAliens(Object.fromEntries(selectedAliens))
                }
              } else {
                setPlayerNumberError(true)
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
                    invalid={playerNumberError && playerNumber === undefined}
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
                  <FormFeedback invalid>
                    Please select a colour
                  </FormFeedback>
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
                      setDrawnCount(e.target.value)
                    }}
                    value={drawnCount}
                  >
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <h2 className='text-dark'>Filters</h2>
                <FormGroup switch>
                  <Input type="switch" role="switch"
                    checked={revised}
                    onChange={() => setRevised(!revised)} />
                  <Label className="text-dark" check>
                    Revised Aliens
                  </Label>
                </FormGroup>
                <FormGroup switch>
                  <Input type="switch" role="switch"
                    checked={useATAliens}
                    onChange={() => setUseATAliens(!useATAliens)} />
                  <Label className="text-dark" check>
                    Alternate Timeline Aliens
                  </Label>
                </FormGroup>
                <FormGroup switch>
                  <Input type="switch" role="switch"
                    checked={useATAliensAndOG && useATAliens}
                    disabled={!useATAliens}
                    onChange={() => setUseATAliensAndOG(!useATAliensAndOG)} />
                  <Label className="text-dark" check>
                    Use both AT and non-AT Aliens
                  </Label>
                </FormGroup>
                <FormGroup switch>
                  <Input type="switch" role="switch"
                    checked={useGameSetup}
                    onChange={() => setUseGameSetup(!useGameSetup)} />
                  <Label className="text-dark" check>
                    Include Aliens with Game Setup
                  </Label>
                </FormGroup>
                <FormGroup switch>
                  <Input type="switch" role="switch"
                    checked={preventBans}
                    onChange={() => setPreventBans(!preventBans)} />
                  <Label className="text-dark" check>
                    Prevent Conflicts (e.g. Sadist & Healer)
                  </Label>
                </FormGroup>
              </Col>
              <Col sm={6}>
                <h2 className='text-dark'>Exclude Aliens</h2>
                <div className="border p-2 rounded border-3">
                  <FormGroup>
                    <Input
                      id="gameSeed"
                      name="gameSeed"
                      placeholder="Filter Aliens"
                      type="text"
                      value={excludeAliensSearch}
                      onChange={(e) => {
                        if (!/[^ A-Za-z0-9\-,]/.test(e.target.value)){
                          setExcludeAliensSearch(e.target.value)
                        }
                      }}
                    />
                  </FormGroup>
                  <div className="overflow-y-scroll" style={{ height: '10vh' }}>
                    {groupByN(3, Object.entries(filterAliens(Aliens.aliens, excludeAliensSearch))).map(row => {
                      return (
                        <Row key={row}>
                          {
                            row.map(alien => {
                              return (
                                <Col sm={4} key={alien}>
                                  <FormGroup check>
                                    <Input type="checkbox"
                                      checked={excludedAliens.includes(alien[0])}
                                      onChange={() => {
                                        if (excludedAliens.includes(alien[0])) {
                                          setExcludedAliens(excludedAliens.filter(alienID => alienID !== alien[0]))
                                        } else {
                                          setExcludedAliens(excludedAliens.concat([alien[0]]))
                                        }
                                      }
                                      }
                                    />
                                    <Label className="text-dark" check>
                                      {alien[1].original.name}
                                      {alien[1].original.altTimeline ? (
                                        <Badge className="ms-1 text-light" color="dark">
                                          AT
                                        </Badge>) : null}
                                    </Label>
                                  </FormGroup>
                                </Col>)
                            })
                          }
                        </Row>
                      )
                    }
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <h3 className='text-dark'>Alert Level</h3>
                {
                  ["Green", "Yellow", "Red"].map(alert => {
                    return (
                      <FormGroup switch key={alert}>
                        <Input type="switch" role="switch"
                          checked={alerts.includes(alert)}
                          onChange={() => {
                            if (alerts.includes(alert)) {
                              setAlerts(alerts.filter(includedAlert => includedAlert !== alert))
                            } else {
                              setAlerts(alerts.concat([alert]))
                            }
                          }
                          }
                        />
                        <Label className="text-dark" check>
                          {alert}
                        </Label>
                      </FormGroup>
                    )
                  })
                }
              </Col>
              <Col sm={9}>
                <h3 className='text-dark'>Expansions</h3>
                {groupByN(3, Object.keys(expansions)).map((row) => {
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
            <Row>
              <Col>
                <Button type="submit" className="w-100 mt-3">Submit</Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Alien}
        url="/Aliens"
        content={givenAliens}
        revised
        noSort
      />
    </Layout>
  )
}