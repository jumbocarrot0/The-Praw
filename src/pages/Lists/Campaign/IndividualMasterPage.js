import React, { useState } from 'react'
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { useRouteLoaderData } from 'react-router-dom';

export default function IndividualMasterPage() {

  const master = useRouteLoaderData("masterIndex")
  const [tab, setTab] = useState("original")

  return (
    <div>
      {master.revised ?
        <Nav className="ps-5 mx-1" tabs>
          <NavItem>
            <NavLink className={"nav-link" + (tab === "original" ? " active" : "")} aria-current="page" href="#"
              onClick={() => { setTab("original") }}>Original</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={"nav-link" + (tab === "revised" ? " active" : "")} href="#"
              onClick={() => { setTab("revised") }}>Revised</NavLink>
          </NavItem>
        </Nav> : null
      }
      <Card className={"mx-1" + (master.revised ? " border-top-0 rounded-top-0" : "")}>
        <CardBody>
          <h1 className='text-light'>{master[tab].name}</h1>

          <p>{master[tab].body}</p>
          <br />


          {master[tab].revisionNotes ? (
            <Card className="bg-light border-warning border-5">
              <CardBody>
                <p className="text-dark">{master[tab].revisionNotes}</p>
              </CardBody>
            </Card>
          ) : null}

        </CardBody>
      </Card>
    </div>
  );
}

