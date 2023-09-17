import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Layout from '../../components/ThrowbackLayout'
import ThrowbackBox from '../../components/ThrowbackBox';

import { getAlien } from "../../supabaseAPI/getAlien"

export default function ThrowbackPage() {

  const alienIndex = "221";

  const [alien, setAlien] = useState(undefined)
  // const [revised, setRevised] = useState(false)

  useEffect(() => {
    getAlien(alienIndex)
      .then((data) => {
        setAlien(data.original)
      })
  }, [alienIndex])

  if (alien === undefined) {
    return <Layout></Layout>
  } else {
    return (<Layout title={alien.name} className='throwback'>
      <ThrowbackBox>
        <div className='px-1'>
          <b>{alien.name.toUpperCase()}</b> [O:CO] {alien.short.toUpperCase()} <Link to="/Aliens">Fantasy Flight</Link>
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
}

