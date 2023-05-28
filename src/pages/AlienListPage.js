import { useState } from "react";
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  CardBody,
  CardHeader,
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
import Aliens from '../dataFiles/originalAliens.json';
import Layout from '../components/Layout'
import { ReactComponent as SearchLogo } from '../searchIcon.svg';
// import revisedAlienData from '../dataFiles/revisedAliens.json';

function Alien(props) {
  return (
    <Card className='mb-5'>
      <Link className={"btn border border-5 " +
        (props.alien.altTimeline ? "btn-dark " : "btn-light ") +
        (props.alien.alert === "Green" ? "border-success" : props.alien.alert === "Yellow" ? "border-warning" : "border-danger")
      } to={props.to} reloadDocument>
        <CardBody>
          <h2 className={!props.alien.altTimeline ? "text-dark" : null}>{props.alien.name}</h2>
          <h6 className="align-items-center">
            <Badge className={props.alien.alert === "Yellow" ? " text-dark" : ""}
              color={props.alien.alert === "Green" ? "success" : props.alien.alert === "Yellow" ? "warning" : "danger"}>
              {props.alien.alert}
            </Badge>
            {props.alien.altTimeline ? (
              <Badge className="ms-3 text-dark" color="light">
                AT
              </Badge>) : null}
          </h6>
          <strong>{props.alien.short}</strong>
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

  let filteredAliens = Object.keys(aliens).map((i) => {
    let newAlien = aliens[i];
    newAlien.ID = i;
    return newAlien;
  });

  filteredAliens = filteredAliens.filter((alien) => alien.name.toLowerCase().includes(search.toLowerCase()))
  filteredAliens = filteredAliens.filter((alien) => expansions.includes(alien.expansion))
  // if (exactPhases){
  //   filteredAliens = filteredAliens.filter((alien) => phases === Object.keys(alien.phases).filter((phase) => alien.phases[phase]).map((phase) => phase))
  // } else {
  //   filteredAliens = filteredAliens.filter((alien) => phases.filter(phase => alien.phases[phase]).length > 0)
  // }
  return filteredAliens

}

export default function AliensListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
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

  let groupByN = (n, arr) => {
    let result = [];
    for (let i = 0; i < arr.length; i += n) result.push({index: i, aliens: arr.slice(i, i + n)});
    return result;
  };

  return (
    <Layout>
      <h1 className='mb-5'>Aliens</h1>
      <Card className='mb-5 bg-light'>
        <CardHeader>
          <h2 className='text-dark mb-3'>Filters</h2>
          <Form onSubmit={
            (event) => {
              event.preventDefault();
              const results = filterAliens(Aliens.aliens, searchQuery,
                Object.keys(expansions).filter((expansion) => expansions[expansion][0]).map((expansion) => expansion))
              console.log(results)
              if (results.length === 1) {
                navigate({
                  pathname: `/Aliens/${results[0].ID}`
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
                  Object.keys(expansions).map((expansion) => (
                    <FormGroup key={expansion} switch>
                      <Input type="switch" role="switch"
                        checked={expansions[expansion][0]}
                        onChange={() => expansions[expansion][1](!expansions[expansion][0])} />
                      <Label className="text-dark" check>
                        {expansion}
                      </Label>
                    </FormGroup>
                  )
                  )
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
        </CardHeader>
      </Card>
      <div>
        {groupByN(3, filteredAliens).map((aliens) => (
          <Row key={aliens.index}>
            {aliens.aliens.map((alien) => (
              <Col key={alien.ID} lg={4}>
                <Alien alien={alien} to={"/Aliens/" + alien.ID} />
              </Col>)
            )}
          </Row>
        )
        )}
      </div>
    </Layout>
  );
}