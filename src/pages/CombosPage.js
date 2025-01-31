import { useState, useEffect } from "react";
import {
  Button, Table, Row, FormGroup, Input, Label
} from 'reactstrap';
import { Link } from "react-router-dom"
import Loading from '../components/Loading'

import { getAllCombos } from "../supabaseAPI/getCombo";
import ComboImage from '../components/ComboImage';

function Combo(props) {
  // console.log(props.Name)
  // console.log(props.Aliens)

  // console.log(props)

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

function RandomCombo(combosData) {
  let comboIndex = Math.floor(Math.random() * combosData.length);
  return combosData[comboIndex];
}

export default function Combos() {
  const [allCombos, setAllCombos] = useState(undefined)
  const [combo, setCombo] = useState(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllCombos()
      .then((data) => {
        // console.log(data)
        data.sort(function (a, b) {
          // console.log(a[1].original.name, b[1].original.name)
          if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return -1;
          }
          else if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        })
        setAllCombos(data)
        setCombo([])
      })
  }, [])

  // console.log(combo)

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
            {/* <Combo {...combo} /> */}
            <ComboImage
              style={{ maxHeight: '50vh' }}
              className="img-fluid rounded-5"
              name={combo.name ?? ""}
              comboAliens={[combo.alien1data, combo.alien2data, combo.alien3data, combo.alien4data, combo.alien5data, combo.alien6data, combo.alien7data, combo.alien8data]}
            // aliens={Object.fromEntries(aliens)}
            // width="675px"
            />
          </div>
          <div className="d-flex justify-content-center p-3">
            <strong>From: {combo.author ?? <br/>}</strong>
          </div>
          <div className="d-flex justify-content-center p-3">
            {/* <Button
              className="me-2"
              color="secondary"
              onClick={() => { setLoading(true); setCombo([]); setCombo(combo); setLoading(false) }}
              disabled={loading}
            >
              Refresh
            </Button> */}
            <Button
              // className="ms-2"
              color="primary"
              onClick={() => { setLoading(true); setCombo(RandomCombo(allCombos)); setLoading(false) }}
              disabled={loading}
            >
              New Combo!
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            <FormGroup className="mt-3">
              <Label for="exampleSelect">
                Select Combo
              </Label>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                onChange={(e) => { setCombo(allCombos[e.target.value]) }}
              >
                <option value={undefined} disabled>
                  Select Combo
                </option>
                {
                  allCombos.map((combo, index) => {
                    // console.log(combo, index)
                    return (
                      <option key={index} value={index}>
                        {combo.name}
                      </option>
                    )
                  })
                }
              </Input>
            </FormGroup>
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