import { useState } from "react";
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Badge

} from 'reactstrap';
import { Link } from "react-router-dom"
import Hazards from '../dataFiles/hazard.json';

function Hazard(props) {
  return (
    <Card className='mb-5'>
      <Link className={"btn btn-light border border-5 " +
        (props.hazard.type === "SemiPermanent" ? "border-warning" : props.hazard.type === "Permanent" ? "border-danger" : "border-light")
      } to={props.to} reloadDocument>
        <CardBody>
          <h2 className="text-dark">{props.hazard.name}</h2>
          <h6 className="align-items-center">
            <Badge className="text-light border border-2 border-light"
              color="dark">
              {props.hazard.expansion}
            </Badge>
          </h6>
        </CardBody>
      </Link>
    </Card>
  )
}

export default function HazardListPage() {

  // Techs.originalTechnologies = Object.keys(Techs.originalTechnologies).map((i) => {
  //   let newTech = Techs.originalTechnologies[i];
  //   newTech.ID = i;
  //   return newTech;
  // });

  // Techs.revisedTechnologies = Object.keys(Techs.revisedTechnologies).map((i) => {
  //   let newTech = Techs.revisedTechnologies[i];
  //   newTech.ID = i;
  //   return newTech;
  // });

  const navigate = useNavigate();

  let groupByN = (n, arr) => {
    let result = [];
    for (let i = 0; i < arr.length; i += n) result.push(arr.slice(i, i + n));
    return result;
  };

  return (
    <Container>
      <h1 className='mb-4'>Hazards</h1>
      <p className="text-light">Hazards are an official variant introduced in Cosmic Conflict. The variant adds an additional hazard deck which is drawn from whenever a destiny card with a hazard warning is drawn (which is roughly 25% of the destiny deck).
        <br />
        Cosmic Conflict introduced 17 hazard cards, 8 of which had duplicated to create a 24-card deck. Cosmic Odyssey introduced an additional 26 cards to bring the total up to 50 hazard cards.</p>

      <hr class="border border-light border-2 opacity-100 mb-5" />
      {groupByN(3, Object.keys(Hazards.hazards)).map((hazards) => {
        return (
          <Row>
            {hazards.map((hazardIndex) => {
              return (<Col lg={4}>
                <Hazard hazard={Hazards.hazards[hazardIndex].original} to={`/Variants/Hazard/${hazardIndex}`} />
              </Col>)
            })}
          </Row>
        )
      })}
    </Container>
  );
}