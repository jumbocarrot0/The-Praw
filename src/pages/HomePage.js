import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'

import Searchbar from '../components/Searchbar'

export default function Home() {

  const navigate = useNavigate()

  return (
    <div>
      <section className="hero text-center">
        <h1 className="hero__title">The Praw</h1>
        <p className="hero__subtitle">A Fan-Made Website for <a href="https://futurepastimes.com/cosmic-encounter-board-game">Cosmic Encounter</a></p>
        <Searchbar />
        <Button className='mt-5 fs-3' color="primary" onClick={() => {
          const randomAlienIndex = Math.floor(Math.random() * 237)
          navigate({pathname: `/Aliens/${randomAlienIndex}`})
        }}>
          Random Alien
        </Button>
      </section>
    </div>
  );
}