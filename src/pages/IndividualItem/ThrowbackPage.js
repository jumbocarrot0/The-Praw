import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Aliens from '../../dataFiles/aliens.json';
import Layout from '../../components/ThrowbackLayout'
import ThrowbackBox from '../../components/ThrowbackBox';

export default function ThrowbackPage() {

  const alienIndex = "221";

  const [alien, setAlien] = useState(Aliens.aliens[alienIndex].original)
  // const [revised, setRevised] = useState(false)

  useEffect(() => {
    setAlien(Aliens.aliens[alienIndex].original)
    // setRevised(false)
  }, [alienIndex])

  return (<Layout title={alien.name} className='throwback'>
    <ThrowbackBox>
      <div className='px-1'>
        <b>{alien.name.toUpperCase()}</b> [FFG:CO] {alien.short.toUpperCase()} <Link to="/Aliens">Fantasy Flight</Link>
        <img className='float-end' alt={alien.name + " Avatar"} src={require(`../../images/alien icons/avatar_${alien.name.replace('The ', '').replace(' ', '_')}${alien.altTimeline ? '_AT' : ''}.png`)} />
        <p><strong>{alien.powerName}</strong> {alien.powerBody}</p>
        <p>
          <strong>History:</strong> {alien.history}
        </p>
        <p>
          <strong>Notes:</strong> The recommended experience level for this power is <strong>Expert</strong>. This is a <strong>Resource</strong> type power.
        </p>
        <p>
          <strong>Wild:</strong> {alien.wildBody}
        </p>
        <p>
          <strong>Super:</strong> {alien.superBody}
        </p>
        <br />
        <p>
          Displayed 1 powers.
        </p>
      </div>
    </ThrowbackBox>
  </Layout>)
}

