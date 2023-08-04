import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'

import Layout from '../components/Layout'
import Searchbar from '../components/Searchbar'



export default function Home() {

  const navigate = useNavigate()

  return (
    <Layout>
      <section className="hero text-center">
        <h1 className="hero__title">The Praw</h1>
        <p className="hero__subtitle">A Fan-Made Website for <a href="https://futurepastimes.com/cosmic-encounter-board-game">Cosmic Encounter</a></p>
        <Searchbar />
        <Button className='mt-5 fs-3' color="primary" onClick={() => {
          const aliens = require('../dataFiles/aliens.json')
          let randomAlienIndex = Math.floor(Math.random() * Object.keys(aliens.aliens).length)
          randomAlienIndex = Object.keys(aliens.aliens)[randomAlienIndex]
          navigate({pathname: `/Aliens/${randomAlienIndex}`})
        }}>
          Random Alien
        </Button>
      </section>
    </Layout>
  );
}