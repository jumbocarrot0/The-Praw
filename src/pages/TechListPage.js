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
import Button from '../components/Button'
import { Link } from "react-router-dom"
import Techs from '../dataFiles/technology.json';
import GridBrowser from "../components/GridBrowser";

function Tech(props) {
  const tech = props.content.original
  const navigate = useNavigate();

  return (
    <Card className='mb-5'>
      <Button color="light"
        width={5}
        border={tech.type === "Mili-Tech" ? "success" : tech.type === "Haz-Tech" ? "danger" : "warning"}
        onClick={() => navigate(props.to)}>
        <CardBody>
          <h2 className="text-dark">{tech.name}</h2>
          <h6 className="align-items-center">
            <Badge className="text-light border border-2 border-light"
              color="dark">
              {tech.expansion}
            </Badge>
          </h6>
          <strong>{tech.short}</strong>
        </CardBody>
      </Button>
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
      <h1 className='mb-4'>Technology</h1>
      <p className="text-light">Technology is an official variant introduced in the base set of Cosmic Encounter. In it, players draw tech cards and keep them facedown. Each regroup phase, a player may research a facedown tech using their ships. One fully researched, techs grant useful abilities to its owner.
        <br />
        The base set includes 20 regular tech cards. Cosmic Odyssey introduced an additional 25 tech cards, including new mili-tech and haz-tech types that are completed in different ways.</p>
      <hr class="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Tech}
        url="/Variants/Tech"
        content={Techs.technologies}
      />
    </Container>
  );
}