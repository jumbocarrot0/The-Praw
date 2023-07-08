import { useState } from "react";
import combosData from '../dataFiles/combos.json';
import {
  Button, Table, Row
} from 'reactstrap';
import { Link } from "react-router-dom"
import Aliens from '../dataFiles/aliens.json';
import Layout from '../components/Layout'

function Combo(props) {
  return (
    <Table dark className="text-center w-50 th-w-50">
      <thead>
        <tr>
          <th colSpan={2}>
            <h2>{props.Name}</h2>
            <strong>{props.Author}</strong>
            </th>
        </tr>
      </thead>
      <tbody>
        <tr><th scope="row" rowSpan={3} className="align-middle">3-Player</th>
        <td>{Aliens.aliens[props.Aliens[0]].original.name}</td></tr>
        <tr><td>{Aliens.aliens[props.Aliens[1]].original.name}</td></tr>
        <tr><td>{Aliens.aliens[props.Aliens[2]].original.name}</td></tr>
        <tr><th scope="row">4-Player</th><td>{Aliens.aliens[props.Aliens[3]].original.name}</td></tr>
        <tr><th scope="row">5-Player</th><td>{Aliens.aliens[props.Aliens[4]].original.name}</td></tr>
        <tr><th scope="row">6-Player</th><td>{Aliens.aliens[props.Aliens[5]].original.name}</td></tr>
        <tr><th scope="row">7-Player</th><td>{Aliens.aliens[props.Aliens[6]].original.name}</td></tr>
        <tr><th scope="row">8-Player</th><td>{Aliens.aliens[props.Aliens[7]].original.name}</td></tr>
      </tbody>
    </Table>
  )
}

function RandomCombo() {
  let comboIndex = Math.floor(Math.random() * combosData.length);
  return combosData[comboIndex];
}

export default function Combos() {
  const [combo, setCombo] = useState(RandomCombo())
  return (
    <Layout title="Combos">
      <Row>
        <h1 className="text-center">Combos</h1>
        <div className="d-flex justify-content-center">
          <Combo {...combo} />
        </div>
        <div className="d-flex justify-content-center">
          <Button
            color="primary"
            onClick={() => { setCombo(RandomCombo()) }}
          >
            New Combo!
          </Button>
        </div>
      </Row>
      <Row className="row mt-5">
        <div className="d-flex justify-content-center">
          <Link className="btn btn-primary w-50" to="https://forms.gle/Xg7aXQsrtitM1dFw9" role="button" target="_blank" rel="external">Submit your own Combo!</Link>
        </div>
      </Row>
    </Layout>
  );
}