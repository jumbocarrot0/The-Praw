import React, { useState } from 'react';
import {
  Card, CardBody, Nav, NavItem, NavLink
} from 'reactstrap';
import { Await, useRouteLoaderData } from "react-router-dom"
// import TimingBar from '../../components/TimingBar';
import Alien from '../../components/Alien'
import Loading from '../../components/Loading'


export default function IndividualHomebrewAlienPage() {

  const alien = useRouteLoaderData("homebrewAlienIndex")

  return (
    <React.Suspense fallback={<Loading />}>
      <Await
        resolve={alien.alien}
        errorElement={
          <p>Error loading alien!</p>
        }
      >
        {(alien) => (
          <>
            <Card className={"mx-1"}>
              <CardBody>

                <Alien alien={{ original: alien }} tab={"original"} />

              </CardBody>
            </Card>
          </>
        )}
      </Await>
    </React.Suspense>
  );
}

