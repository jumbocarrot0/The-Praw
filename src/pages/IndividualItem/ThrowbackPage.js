import React from 'react';
import { Link } from "react-router-dom"
import Layout from '../../components/ThrowbackLayout'
import ThrowbackBox from '../../components/ThrowbackBox';
import { Await, useRouteLoaderData } from "react-router-dom"

export default function ThrowbackPage() {

  const alien = useRouteLoaderData("throwback")

  return (
    <Layout class="throwback">
      <ThrowbackBox>
        <React.Suspense fallback={null}>
          <Await
            resolve={alien.alien}
            errorElement={
              <p>Error loading alien!</p>
            }
          >
            {(alien) => (
              <div className='px-1'>
                <b>{alien.original.name.toUpperCase()}</b> [O:CO] {alien.original.short.toUpperCase()} <Link to="/Aliens">Fantasy Flight</Link>
                <img className='float-end' alt={alien.original.name + " Avatar"} src={require(`../../images/alien icons/avatar_${alien.original.name.replace('The ', '').replace(' ', '_')}${alien.original.altTimeline ? '_AT' : ''}.png`)} />
                <p><strong>{alien.original.powerName}</strong> {alien.original.powerBody}</p>
                <p>
                  <strong>History:</strong> {alien.original.history}
                </p>
                <p>
                  <strong>Notes:</strong> The recommended experience level for this power is <strong>Expert</strong>. This is a <strong>Resource</strong> type power.
                </p>
                <p>
                  <strong>Wild:</strong> {alien.original.wildBody}
                </p>
                <p>
                  <strong>Super:</strong> {alien.original.superBody}
                </p>
                <br />
                <p>
                  Displayed 1 powers.
                </p>
              </div>
            )}
          </Await>
        </React.Suspense>
      </ThrowbackBox>
    </Layout>)
}

