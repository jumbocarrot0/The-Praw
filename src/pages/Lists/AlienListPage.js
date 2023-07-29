import { useState } from "react";
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
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
  InputGroupText,
  Form,
  FormGroup,
  Label,
  Button
} from 'reactstrap';
import { Link } from "react-router-dom"
import Aliens from '../../dataFiles/aliens.json';
import { ReactComponent as SearchLogo } from '../../svg/searchIcon.svg';
import GridBrowser from "../../components/GridBrowser";
import Layout from '../../components/Layout'

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
              <Badge className="ms-3 text-dark" color="info">
                Game Setup
              </Badge>) : null}
          </h6>
          <img alt={alien.name + " Thumbnail"}
            className='mx-auto d-block'
            src={require(`../../images/alien icons/${alien.thumbnail}`)}
          />
          <strong>{alien.short}</strong>
        </CardBody>
      </Link>
    </Card>
  )
}

function filterAliens(aliens, search, expansions, phases, exactPhases) {

  if (expansions.includes("42nd Anniversary Edition")) {
    expansions.push("Base Set");
  }

  let filteredAliens = Object.entries(aliens);

  filteredAliens = filteredAliens.filter((alien) => alien[1].original.name.toLowerCase().includes(search.toLowerCase()))
  filteredAliens = filteredAliens.filter((alien) => expansions.includes(alien[1].original.expansion))
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
  return Object.fromEntries(filteredAliens)

}

export default function AliensListPage() {
  const searchParams = useSearchParams()[0];
  const submittedQuery = (searchParams.get('search') || '');
  const [searchQuery, setSearchQuery] = useState(submittedQuery);

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

  const navigate = useNavigate();

  // console.log(phases)
  // console.log(exactPhases)
  let filteredAliens = filterAliens(Aliens.aliens, submittedQuery, submittedExpansions, submittedPhases, submittedExactPhases)

  // filteredAliens = Object.entries(filteredAliens)

  // filteredAliens.sort(function (a, b) {
  //   const expansions = ["Base Set", "Cosmic Incursion", "Cosmic Conflict", "Cosmic Alliance", "Cosmic Storm", "Cosmic Dominion", "Cosmic Eons", "42nd Anniversary Edition", "Cosmic Odyssey"]
  //   // console.log(a.expansion)
  //   if (expansions.findIndex((e) => e === a[1].original.expansion) < expansions.findIndex((e) => e === b[1].original.expansion)) {
  //     return -1;
  //   }
  //   else if (expansions.findIndex((e) => e === a[1].original.expansion) > expansions.findIndex((e) => e === b[1].original.expansion)) {
  //     return 1;
  //   } else {
  //     if (a[1].original.name < b[1].original.name) {
  //       return -1;
  //     }
  //     else if (a[1].original.name > b[1].original.name) {
  //       return 1;
  //     }
  //   }
  //   return 0;
  // })

  // filteredAliens = Object.fromEntries(filteredAliens)

  return (
    <Layout title="Aliens">
      <h1 className='mb-4'>Aliens</h1>
      <Card className='mb-4 bg-light'>
        <CardBody>
          <CardTitle className='text-dark mb-3 text-center' tag="h2">Search Filters</CardTitle>
          <Form onSubmit={
            (event) => {
              event.preventDefault();
              // console.log(results)
              navigate({
                pathname: `/Aliens`,
                search: `?${createSearchParams([['search', searchQuery], ['exactPhases', exactPhases]]
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
                )}`
              });
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
                  {/* <InputGroupText className="bg-light text-dark">
                  </InputGroupText> */}
                  <Button
                    className="px-3"
                    color={searchQuery.length === 0 ? "dark" : "primary"}
                    disabled={searchQuery.length === 0}
                    outline={searchQuery.length === 0}>
                    <SearchLogo/>
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
                          checked={expansions[expansion][0]}
                          onChange={() => expansions[expansion][1](!expansions[expansion][0])} />
                        <Label className="text-dark" check>
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
                    onChange={() => setExactPhases(!exactPhases)} />
                  <Label className="text-dark" check>
                    Exact
                  </Label>
                </FormGroup>
                {
                  Object.keys(phases).map((phase) => {
                    return (
                      <FormGroup key={phase} switch>
                        <Input type="switch" role="switch"
                          checked={phases[phase][0]}
                          onChange={() => phases[phase][1](!phases[phase][0])} />
                        <Label className="text-dark" check>
                          {phase}
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
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Alien}
        url="/Aliens"
        content={filteredAliens}
        width={4}
      />
    </Layout>
  );
}