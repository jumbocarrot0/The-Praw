import { useState, useEffect } from "react";
import {
  Button, Table, Row
} from 'reactstrap';
import { Link } from "react-router-dom"
import Loading from '../components/Loading'

import { getRandomCombo } from "../supabaseAPI/getCombo";

function Combo(props) {
  // console.log(props.Name)
  // console.log(props.Aliens)
  return (
    <Table dark className="text-center w-50 th-w-50">
      <thead>
        <tr>
          <th colSpan={2}>
            <h2>{props.name}</h2>
            <strong>{props.author}</strong>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr><th scope="row" rowSpan={3} className="align-middle">3-Player</th>
          <td>{props.alien1data.original.name}</td></tr>
        <tr><td>{props.alien2data.original.name}</td></tr>
        <tr><td>{props.alien3data.original.name}</td></tr>
        <tr><th scope="row">4-Player</th><td>{props.alien4data.original.name}</td></tr>
        <tr><th scope="row">5-Player</th><td>{props.alien5data.original.name}</td></tr>
        <tr><th scope="row">6-Player</th><td>{props.alien6data.original.name}</td></tr>
        <tr><th scope="row">7-Player</th><td>{props.alien7data.original.name}</td></tr>
        <tr><th scope="row">8-Player</th><td>{props.alien8data.original.name}</td></tr>
      </tbody>
    </Table>
  )
}

// function RandomCombo() {
//   let comboIndex = Math.floor(Math.random() * combosData.length);
//   return combosData[comboIndex];
// }

export default function Combos() {
  const [combo, setCombo] = useState(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRandomCombo()
      .then((data) => {
        // console.log(data)
        setCombo(data)
      })
  }, [])

  // console.log(combo)
  if (combo === undefined) {
    return (<div>
      <Loading />
    </div>)
  } else {
    return (
      <div>
        <Row>
          <h1 className="text-center">Combos</h1>
          <div className="d-flex justify-content-center">
            <Combo {...combo} />
          </div>
          <div className="d-flex justify-content-center">
            <Button
              color="primary"
              onClick={() => { setLoading(true); getRandomCombo().then(data => setCombo(data)).then(_ => setLoading(false)) }}
              disabled={loading}
            >
              New Combo!
            </Button>
          </div>
          <div className="d-flex justify-content-center">
          {/* <FormGroup>
            <Label for="exampleSelect">
              Select Combo
            </Label>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              onChange={(e) => { getCombo(e.target.value).then(data => setCombo(data))}}
            >
              <option value={undefined} disabled>
                Select Combo
              </option>
              {
                combosData.map((combo, index) => {
                  // console.log(combo, index)
                  return (
                    <option key={index} value={index}>
                      {combo.Name}
                    </option>
                  )
                })
              }
            </Input>
          </FormGroup> */}
        </div>
        </Row>
        <Row className="row mt-5">
          <div className="d-flex justify-content-center">
            <Link className="btn btn-primary w-50" to="/Combos/Submit" role="button">Submit your own Combo!</Link>
          </div>
        </Row>
      </div>
    );
  }
}