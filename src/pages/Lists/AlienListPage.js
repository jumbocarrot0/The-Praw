import React, { Suspense, lazy } from "react";
import { useState } from "react";
import { useSearchParams, createSearchParams, useNavigate, Await, useRouteLoaderData } from 'react-router-dom'
import {
  Card,
  CardTitle,
  CardBody,
  // CardHeader,
  Row,
  Col,
  Badge,
  InputGroup,
  Input,
  // InputGroupText,
  Form,
  FormGroup,
  Label,
  Button
} from 'reactstrap';
import { Link } from "react-router-dom"
import { ReactComponent as SearchLogo } from '../../svg/searchIcon.svg';
// import GridBrowser from "../../components/GridBrowser";

import Loading from '../../components/Loading'
// import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const GridBrowser = lazy(() => import('../../components/GridBrowser'));
const InfiniteScroll = lazy(() => import('react-infinite-scroll-component'));

function Alien(props) {
  const alien = props.content

  return (
    <Card className='mb-5'>
      <Link className={"btn border border-5 " +
        (alien.altTimeline ? "btn-dark " : "btn-light ") +
        (alien.alert === "Green" ? "border-success" : alien.alert === "Yellow" ? "border-warning" : "border-danger")
      }
        style={alien.altTimeline ? { boxShadow: "0px 0px 15px #f600ff inset" } : null}
        to={props.to}>
        <CardBody>
          <h2 className={!alien.altTimeline ? "text-dark" : null}>{alien.name}</h2>
          <div className="align-items-center h6">
            <Badge className={alien.alert === "Yellow" ? " text-dark" : ""}
              color={alien.alert === "Green" ? "success" : alien.alert === "Yellow" ? "warning" : "danger"}>
              {alien.alert}
            </Badge>
            {alien.altTimeline ? (
              <Badge className="ms-1 text-dark" color="light">
                AT
              </Badge>) : null}
            {alien.gameSetup !== "" ? (
              <Badge className="ms-1 text-dark" color="info">
                Game Setup
              </Badge>) : null}
            <Badge
              className={`ms-1 ${["Cosmic Alliance", "Cosmic Conflict"].includes(alien.expansion) ? "text-dark" : ""}`}
              color={
                alien.expansion === "Base Set" ? "primary" :
                  alien.expansion === "Cosmic Incursion" ? "indigo" :
                    alien.expansion === "Cosmic Conflict" ? "info" :
                      alien.expansion === "Cosmic Alliance" ? "warning" :
                        alien.expansion === "Cosmic Storm" ? "danger" :
                          alien.expansion === "Cosmic Dominion" ? "success" :
                            alien.expansion === "Cosmic Eons" ? "pink" :
                              alien.expansion === "Cosmic Odyssey" ? "purple" :
                                "dark"
              }>
              {alien.expansion}
            </Badge>
          </div>
          <img alt={alien.name + " Thumbnail"}
            className='mx-auto d-block'
            width="72"
            height="72"
            src={require(`../../images/alien icons/${alien.thumbnail}`)}
          />
          <strong>{alien.short}</strong>
        </CardBody>
      </Link>
    </Card>
  )
}

function filterAliens(aliens, search, expansions, phases, exactPhases, player, exactPlayer, alertLevels) {

  if (expansions.includes("42nd Anniversary Edition")) {
    expansions.push("Base Set");
  }

  let filteredAliens = Object.entries(aliens);

  // console.log(filteredAliens)

  filteredAliens = filteredAliens.filter((alien) => alien[1].original.name.toLowerCase().includes(search.toLowerCase()))
  filteredAliens = filteredAliens.filter((alien) => expansions.includes(alien[1].original.expansion))
  filteredAliens = filteredAliens.filter((alien) => alertLevels.includes(alien[1].original.alert))

  if (exactPhases) {
    filteredAliens = filteredAliens.filter((alien) => {
      const alienPhases = Object.keys(alien[1].original.powerTiming.phases).filter(phase => alien[1].original.powerTiming.phases[phase])
      // console.log(alienPhases)
      // console.log(phases)
      return (alienPhases.length === phases.length) && alienPhases.every((phase, index) => phase === phases[index])
    }
    )
    // filteredAliens = filteredAliens.filter((alien) => phases === Object.keys(alien[1].original.powerTiming.phases).filter(phase => alien[1].original.powerTiming.phases[phase]))
  } else {
    filteredAliens = filteredAliens.filter((alien) => phases.filter(phase => alien[1].original.powerTiming.phases[phase]).length > 0)
  }

  // console.log(exactPlayer)
  // console.log(player)
  filteredAliens = filteredAliens.filter((alien) => {
    let alienPlayerTiming = {
      offense: true,
      defense: true,
      offensiveAlly: true,
      defensiveAlly: true,
      notInvolved: false
    }
    switch ('revised' in alien[1] ? alien[1].revised.powerTiming.player : alien[1].original.powerTiming.player) {
      case "As Any Player":
        alienPlayerTiming = {
          offense: true,
          defense: true,
          offensiveAlly: true,
          defensiveAlly: true,
          notInvolved: true
        }
        break;
      case "Offense Only":
        alienPlayerTiming = {
          offense: true,
          defense: false,
          offensiveAlly: false,
          defensiveAlly: false,
          notInvolved: false
        }
        break;
      case "Defense Only":
        alienPlayerTiming = {
          offense: false,
          defense: true,
          offensiveAlly: false,
          defensiveAlly: false,
          notInvolved: false
        }
        break;
      case "Offensive Ally Only":
        alienPlayerTiming = {
          offense: false,
          defense: false,
          offensiveAlly: true,
          defensiveAlly: false,
          notInvolved: false
        }
        break;
      case "Defensive Ally Only":
        alienPlayerTiming = {
          offense: false,
          defense: false,
          offensiveAlly: false,
          defensiveAlly: true,
          notInvolved: false
        }
        break;
      case "Main Player Only":
        alienPlayerTiming = {
          offense: true,
          defense: true,
          offensiveAlly: false,
          defensiveAlly: false,
          notInvolved: false
        }
        break;
      case "Not Offense":
        alienPlayerTiming = {
          offense: false,
          defense: true,
          offensiveAlly: true,
          defensiveAlly: true,
          notInvolved: true
        }
        break;
      case "Not Defense":
        alienPlayerTiming = {
          offense: true,
          defense: false,
          offensiveAlly: true,
          defensiveAlly: true,
          notInvolved: true
        }
        break;
      case "Not Main Player":
        alienPlayerTiming = {
          offense: false,
          defense: false,
          offensiveAlly: true,
          defensiveAlly: true,
          notInvolved: true
        }
        break;
      case "Not Ally":
        alienPlayerTiming = {
          offense: true,
          defense: true,
          offensiveAlly: false,
          defensiveAlly: false,
          notInvolved: true
        }
        break;
      case "Offense or Offensive Ally Only":
        alienPlayerTiming = {
          offense: true,
          defense: false,
          offensiveAlly: true,
          defensiveAlly: false,
          notInvolved: false
        }
        break;
      case "Defense or Defensive Ally Only":
        alienPlayerTiming = {
          offense: false,
          defense: true,
          offensiveAlly: false,
          defensiveAlly: true,
          notInvolved: false
        }
        break;
      case "Main Player or Ally Only":
        alienPlayerTiming = {
          offense: true,
          defense: true,
          offensiveAlly: true,
          defensiveAlly: true,
          notInvolved: false
        }
        break;
      case "Not Main Player or Ally":
        alienPlayerTiming = {
          offense: false,
          defense: false,
          offensiveAlly: false,
          defensiveAlly: false,
          notInvolved: true
        }
        break;
      case "Main Player or Offensive Ally Only":
        alienPlayerTiming = {
          offense: true,
          defense: true,
          offensiveAlly: true,
          defensiveAlly: false,
          notInvolved: false
        }
        break;
      case "Main Player or Defensive Ally Only":
        alienPlayerTiming = {
          offense: true,
          defense: true,
          offensiveAlly: false,
          defensiveAlly: true,
          notInvolved: false
        }
        break;
      case "Offense or Ally Only":
        alienPlayerTiming = {
          offense: true,
          defense: false,
          offensiveAlly: true,
          defensiveAlly: true,
          notInvolved: false
        }
        break;
      case "Defense or Ally Only":
        alienPlayerTiming = {
          offense: false,
          defense: true,
          offensiveAlly: true,
          defensiveAlly: true,
          notInvolved: false
        }
        break;
      default:
        break;
    }

    if (exactPlayer) {
      return (player.length === Object.values(alienPlayerTiming).filter(value => value).length) && Object.keys(alienPlayerTiming).filter(key => alienPlayerTiming[key]).every((playerCategory, index) => player.includes(playerCategory))
    } else {
      return Object.keys(alienPlayerTiming).filter(key => alienPlayerTiming[key]).some(playerCategory => player.includes(playerCategory))
    }
  })

  return Object.fromEntries(filteredAliens)

}

export default function AliensListPage() {
  const searchParams = useSearchParams()[0];
  const submittedQuery = (searchParams.get('search') || '');
  const [searchQuery, setSearchQuery] = useState(submittedQuery);

  const [dataLength, setDataLength] = useState(20)

  const aliens = useRouteLoaderData("aliens")
  // const [aliens, setAliens] = useState(undefined)
  // useEffect(() => {
  //   getAllAliens()
  //     .then((data) => {
  //       setAliens(data)
  //     })
  // }, [])

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

  const phaseLabels = {
    "startTurn": "Start Turn",
    "regroup": "Regroup",
    "destiny": "Destiny",
    "launch": "Launch",
    "alliance": "Alliance",
    "planning": "Planning",
    "reveal": "Reveal",
    "resolution": "Resolution"
  }
  let submittedPhases = ["startTurn", "regroup", "destiny", "launch", "alliance", "planning", "reveal", "resolution"];
  submittedPhases = submittedPhases.filter((phase) => searchParams.get(phase) !== 'false');
  const submittedExactPhases = searchParams.get('exactPhases') === 'true'
  const [exactPhases, setExactPhases] = useState(submittedExactPhases)
  const phases = {
    "startTurn": useState(submittedPhases.includes("startTurn")),
    "regroup": useState(submittedPhases.includes("regroup")),
    "destiny": useState(submittedPhases.includes("destiny")),
    "launch": useState(submittedPhases.includes("launch")),
    "alliance": useState(submittedPhases.includes("alliance")),
    "planning": useState(submittedPhases.includes("planning")),
    "reveal": useState(submittedPhases.includes("reveal")),
    "resolution": useState(submittedPhases.includes("resolution"))
  }


  const playerLabels = {
    "offense": "Offense",
    "defense": "Defense",
    "offensiveAlly": "Offensive Ally",
    "defensiveAlly": "Defensive Ally",
    "notInvolved": "Not Involved"
  }
  let submittedPlayer = ["offense", "defense", "offensiveAlly", "defensiveAlly", "notInvolved"];
  submittedPlayer = submittedPlayer.filter((player) => searchParams.get(player) !== 'false');
  const submittedExactPlayer = searchParams.get('exactPlayer') === 'true'
  const [exactPlayer, setExactPlayer] = useState(submittedExactPlayer)
  const player = {
    "offense": useState(submittedPlayer.includes("offense")),
    "defense": useState(submittedPlayer.includes("defense")),
    "offensiveAlly": useState(submittedPlayer.includes("offensiveAlly")),
    "defensiveAlly": useState(submittedPlayer.includes("defensiveAlly")),
    "notInvolved": useState(submittedPlayer.includes("notInvolved"))
  }

  let submittedAlertLevels = ["Green", "Yellow", "Red"];
  submittedAlertLevels = submittedAlertLevels.filter((alert) => searchParams.get(alert) !== 'false');
  const alertLevels = {
    "Green": useState(submittedAlertLevels.includes("Green")),
    "Yellow": useState(submittedAlertLevels.includes("Yellow")),
    "Red": useState(submittedAlertLevels.includes("Red"))
  }

  const navigate = useNavigate();
  let filteredAliens = [];

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <link rel="preconnect" href="https://eqnegwhqvqkqqokfezxc.supabase.co" />
        </Helmet>
      </HelmetProvider>
      <h1 className='mb-4'>Browse Aliens</h1>
      <Card className='mb-4 bg-light'>
        <CardBody>
          <CardTitle className='text-dark mb-3 text-center' tag="h2">Search Filters</CardTitle>
          <Form onSubmit={
            (event) => {
              event.preventDefault();
              // console.log(results)
              navigate({
                pathname: `/Aliens`,
                search: `?${createSearchParams([['search', searchQuery], ['exactPhases', exactPhases], ['exactPlayer', exactPlayer]]
                  .concat(
                    Object.keys(expansions)
                      .filter((expansion) => !expansions[expansion][0])
                      .map((expansion) => [expansion, expansions[expansion][0]])
                  )
                  .concat(
                    Object.keys(phases)
                      .filter((phase) => !phases[phase][0])
                      .map((phase) => [phase, phases[phase][0]])
                  )
                  .concat(
                    Object.keys(player)
                      .filter((playerCategory) => !player[playerCategory][0])
                      .map((playerCategory) => [playerCategory, player[playerCategory][0]])
                  )
                  .concat(
                    Object.keys(alertLevels)
                      .filter((alert) => !alertLevels[alert][0])
                      .map((alert) => [alert, alertLevels[alert][0]])
                  )
                )}`
              });
              setDataLength(20);
            }}>
            <Row className="mb-3">
              <Col sm={3}></Col>
              <Col sm={6}>
                <InputGroup>
                  <Input
                    className="bg-light text-dark fs-5"
                    placeholder="Search the Cosmos"
                    value={searchQuery}
                    onChange={(e) => {
                      if (!/[^ A-Za-z0-9\-,]/.test(e.target.value)) {
                        setSearchQuery(e.target.value)
                      }
                    }} />
                  <Button
                    aria-label="Submit search"
                    className="px-3"
                    color={searchQuery.length === 0 ? "dark" : "primary"}
                    outline={searchQuery.length === 0}>
                    <SearchLogo />
                  </Button>
                </InputGroup>
              </Col>
              <Col sm={3}></Col>
            </Row>
            <Row>
              <Col>
                <h3 className='text-dark'>Expansions</h3>
                {
                  Object.keys(expansions).map((expansion) => {
                    return (
                      <FormGroup key={expansion} switch>
                        <Input type="switch" role="switch"
                          id={expansion}
                          checked={expansions[expansion][0]}
                          onChange={() => expansions[expansion][1](!expansions[expansion][0])} />
                        <Label for={expansion} className="text-dark" check>
                          {expansion}
                        </Label>
                      </FormGroup>
                    )
                  })
                }
              </Col>
              <Col>
                <h3 className='text-dark'>Phases</h3>
                <FormGroup>
                  <Input
                    className="me-4"
                    type="checkbox"
                    checked={exactPhases}
                    id="exactPhases"
                    onChange={() => setExactPhases(!exactPhases)} />
                  <Label for="exactPhases" className="text-dark" check>
                    Exact Matches Only
                  </Label>
                </FormGroup>
                {
                  Object.keys(phases).map((phase) => {
                    return (
                      <FormGroup key={phase} switch>
                        <Input type="switch" role="switch"
                          id={phase}
                          checked={phases[phase][0]}
                          onChange={() => phases[phase][1](!phases[phase][0])} />
                        <Label for={phase} className="text-dark" check>
                          {phaseLabels[phase]}
                        </Label>
                      </FormGroup>
                    )
                  })
                }
              </Col>
              <Col>
                <h3 className='text-dark'>Player Requirements</h3>
                <FormGroup>
                  <Input
                    className="me-4"
                    type="checkbox"
                    checked={exactPlayer}
                    id="exactPlayer"
                    onChange={() => setExactPlayer(!exactPlayer)} />
                  <Label for="exactPlayer" className="text-dark" check>
                    Exact Matches Only
                  </Label>
                </FormGroup>
                {
                  Object.keys(player).map((playerCategory) => {
                    return (
                      <FormGroup key={playerCategory} switch>
                        <Input type="switch" role="switch"
                          checked={player[playerCategory][0]}
                          id={playerCategory}
                          onChange={() => player[playerCategory][1](!player[playerCategory][0])} />
                        <Label for={playerCategory} className="text-dark" check>
                          {playerLabels[playerCategory]}
                        </Label>
                      </FormGroup>
                    )
                  })
                }
                <h3 className='text-dark mt-2'>Alert Levels</h3>
                {
                  Object.keys(alertLevels).map((alert) => {
                    return (
                      <FormGroup key={alert} switch>
                        <Input type="switch" role="switch"
                          checked={alertLevels[alert][0]}
                          id={alert}
                          onChange={() => alertLevels[alert][1](!alertLevels[alert][0])} />
                        <Label for={alert} className="text-dark" check>
                          {alert}
                        </Label>
                      </FormGroup>
                    )
                  })
                }
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <hr className="border border-light border-2 opacity-100 mb-4" />
      <Suspense fallback={<Loading />}>
        <Await
          resolve={aliens.aliens}
          errorElement={
            <p className="fs-3 text-center">Error loading aliens!</p>
          }
        >
          {(aliens) => {
            if (aliens !== undefined) {
              filteredAliens = filterAliens(aliens, submittedQuery, submittedExpansions, submittedPhases, submittedExactPhases, submittedPlayer, submittedExactPlayer, submittedAlertLevels)
            }
            // console.log(filteredAliens)
            return <>
              <p>{Object.keys(filteredAliens).length}/238 Results</p>
              {/* <GridBrowser cardTemplate={Alien}
                url="/Aliens"
                content={filteredAliens}
                width={4}
              /> */}
              {Object.keys(filteredAliens).length === 0 ? <div>
                <p className="fs-3 text-center">No aliens match your filters.</p>
              </div> :
                <InfiniteScroll
                  dataLength={Math.min(dataLength, Object.keys(filteredAliens).length)}
                  next={() => setDataLength(value => Math.min(value + 20, Object.keys(filteredAliens).length))}
                  hasMore={dataLength < Object.keys(filteredAliens).length}
                  loader={<Loading />}
                  className="overflow-hidden"
                >
                  <GridBrowser cardTemplate={Alien}
                    url="/Aliens"
                    content={filteredAliens}
                    elementsToDisplay={dataLength}
                    width={4}
                  />
                </InfiniteScroll>
              }
            </>
          }
          }
        </Await>
      </Suspense>
    </>
  );
}