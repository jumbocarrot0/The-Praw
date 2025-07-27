import React from 'react';
import { Link } from "react-router-dom";
import Layout from '../../components/ThrowbackLayout';
import ThrowbackBox from '../../components/ThrowbackBox';
import { Await, useRouteLoaderData } from "react-router-dom";
import PartStyle from '../../components/PartStyle';

export default function ThrowbackPage() {

  const alien = useRouteLoaderData("throwback")
  const tab = "original"
  const viewMode = 0

  function handleParts(part, i) {
      return part.value.split(' ').map((word, j) => <PartStyle key={`${i}${j}`} part={part} viewMode={viewMode} tab={tab}>{j === 0 ? `${word}` : ` ${word}`}</PartStyle>)
  }

  return (
    <Layout class="throwback">
      <ThrowbackBox>
        <React.Suspense fallback={null}>
          <Await
            resolve={alien}
            errorElement={
              <p>Error loading alien!</p>
            }
          >
            {(alien) => (
              <div className='px-1'>
                <b>{alien.name.toUpperCase()}</b> [O:CO] {alien.short.map((part) => {return {style: part.style, value: part.value.toUpperCase()}}).map(handleParts)} <Link to="/Aliens">Fantasy Flight</Link>
                <img className='float-end' alt={alien.name + " Avatar"} src={require(`../../images/alien icons/avatar_${alien.name.replace('The ', '').replace(' ', '_')}${alien.altTimeline ? '_AT' : ''}.png`)} />
                <p><strong>{alien.powerName.map(handleParts)}</strong> {alien.powerBody.map(handleParts)}</p>
                <p>
                  <strong>History:</strong> {alien.history.map(handleParts)}
                </p>
                <p>
                  <strong>Notes:</strong> The recommended experience level for this power is <strong>Expert</strong>. This is a <strong>Resource</strong> type power.
                </p>
                <p>
                  <strong>Wild:</strong> {alien.wildBody.map(handleParts)}
                </p>
                <p>
                  <strong>Super:</strong> {alien.superBody.map(handleParts)}
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

