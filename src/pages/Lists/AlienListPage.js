import { useState } from "react";
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
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
  Label

} from 'reactstrap';
import { Link } from "react-router-dom"
import Aliens from '../../dataFiles/aliens.json';
import { ReactComponent as SearchLogo } from '../../searchIcon.svg';
import GridBrowser from "../../components/GridBrowser";
import Layout from '../../components/Layout'

function Alien(props) {
  const alien = props.content
  return (
    <Card className='mb-5'>
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
            {alien.gameSetup !== "" ? (
              <Badge className="ms-3 text-light" color="info">
                Game Setup
              </Badge>) : null}
          </h6>
          <strong>{alien.short}</strong>
        </CardBody>
      </Link>
    </Card>
  )
}

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

  // let submittedPhases = ["Start Turn", "Regroup", "Destiny", "Launch", "Alliance", "Planning", "Reveal", "Resolution"];
  // submittedPhases = submittedPhases.filter((phase) => searchParams.get(phase) !== 'false');
  // const submittedExactPhases = searchParams.get('exactPhase') !== 'false'
  // const [exactPhases, setExactPhases] = useState(false)
  // const phases = {
  //   "Start Turn": useState(submittedPhases.includes("Start Turn")),
  //   "Regroup": useState(submittedPhases.includes("Regroup")),
  //   "Destiny": useState(submittedPhases.includes("Destiny")),
  //   "Launch": useState(submittedPhases.includes("Launch")),
  //   "Alliance": useState(submittedPhases.includes("Alliance")),
  //   "Planning": useState(submittedPhases.includes("Planning")),
  //   "Reveal": useState(submittedPhases.includes("Reveal")),
  //   "Resolution": useState(submittedPhases.includes("Resolution"))
  // }

  const navigate = useNavigate();

  const filteredAliens = filterAliens(Aliens.aliens, submittedQuery, submittedExpansions)

  // filteredAliens = Object.entries(filteredAliens)
  
  // filteredAliens.sort(function(a, b) {
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
    <Layout>
      <h1 className='mb-4'>Aliens</h1>
      <Card className='mb-4 bg-light'>
        <CardBody>
          <h2 className='text-dark mb-3'>Filters</h2>
          <Form onSubmit={
            (event) => {
              event.preventDefault();
              const results = filterAliens(Aliens.aliens, searchQuery,
                Object.keys(expansions).filter((expansion) => expansions[expansion][0]).map((expansion) => expansion))
              console.log(results)
              if (results.length === 1) {
                navigate({
                  pathname: `/Aliens/${Object.keys(results)[0]}`
                });
              } else {
                navigate({
                  pathname: `/Aliens`,
                  search: `?${createSearchParams([['search', searchQuery]]
                    .concat(Object.keys(expansions)
                      .filter((expansion) => !expansions[expansion][0])
                      .map((expansion) => [expansion, expansions[expansion][0]])))}`
                });
              }
            }}>
            <Row className="mb-3">
              <InputGroup>
                <Input
                  className="bg-light text-dark"
                  placeholder="Search the Cosmos"
                  value={searchQuery}
                  onChange={(e) => {
                    if (!/[^A-Za-z0-9\-,]/.test(e.target.value)) {
                      setSearchQuery(e.target.value)
                    }
                  }} />
                <InputGroupText className="bg-light text-dark">
                  <SearchLogo />
                </InputGroupText>
              </InputGroup>
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
              {/* <Col>
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
                      <FormGroup switch>
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
              </Col> */}
            </Row>
          </Form>
        </CardBody>
      </Card>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Alien}
        url="/Aliens"
        content={filteredAliens}
      />
    </Layout>
  );
}