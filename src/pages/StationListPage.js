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
import Stations from '../dataFiles/stations.json';
import GridBrowser from "../components/GridBrowser";

function Station(props) {
  const station = props.content.original
  const navigate = useNavigate();
  
  return (
    <Card className='mb-5'>
      <Button color="light"
        border={station.type === "Sky City" ? "success" : station.type === "Space Station" ? "primary" : "secondary"}
        width={5}
        onClick={() => navigate(props.to)}>
        <CardBody>
          <h2 className="text-dark">{station.name}</h2>
          <h6 className="align-items-center">
            <Badge className="text-light border border-2 border-light"
              color="dark">
              {station.expansion}
            </Badge>
          </h6>
        </CardBody>
      </Button>
    </Card>
  )
}

export default function StationListPage() {

  let groupByN = (n, arr) => {
    let result = [];
    for (let i = 0; i < arr.length; i += n) result.push(arr.slice(i, i + n));
    return result;
  };

  return (
    <Container>
      <h1 className='mb-4'>Space Stations</h1>
      <p className="text-light">Space Stations are an official variant introduced in Cosmic Storm. In it, players get control of stations attached to their planets, which they use the ability of for as long as they keep the planet.
        <br />
        Cosmic Storm introduced 10 stations. Cosmic Odyssey introduced an 26 stations and 2 new types of stations.</p>
      <hr class="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Station}
        url="/Variants/Stations"
        content={Stations.stations}
      />
    </Container>
  );
}