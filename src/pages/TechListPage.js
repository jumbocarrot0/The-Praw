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
import Techs from '../dataFiles/technology.json';

function Tech(props) {
  return (
    <Card className='mb-5'>
      <Link className={"btn border border-5 " +
        (props.tech.type === "Mili-Tech" ? "border-success" : props.tech.type === "Haz-Tech" ? "border-danger" : "border-warning")
      } to={props.to} reloadDocument>
        <CardBody>
          <h2>{props.tech.name}</h2>
          <h6 className="align-items-center">
            <Badge className="text-light border border-2 border-light"
              color="dark">
              {props.tech.expansion}
            </Badge>
          </h6>
          <strong>{props.tech.short}</strong>
        </CardBody>
      </Link>
    </Card>
  )
}

export default function TechListPage() {

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
      <h1 className='mb-4'>Technologies</h1>
      <hr class="border border-light border-2 opacity-100 mb-5" />
      {groupByN(3, Object.keys(Techs.technologies)).map((techs) => {
        return (
          <Row>
            {techs.map((techIndex) => {
              return (<Col lg={4}>
                <Tech tech={Techs.technologies[techIndex].original} to={`/Variants/Tech/${techIndex}`} />
              </Col>)
            })}
          </Row>
        )
      })}
    </Container>
  );
}