import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'

import Searchbar from '../components/Searchbar'
import { getAlienCount } from '../supabaseAPI/getAlien'
import { useEffect, useState } from 'react'

import Techs from '../dataFiles/technology.json'
import Hazards from '../dataFiles/hazards.json'
import Stations from '../dataFiles/stations.json'
import Lux from '../dataFiles/lux.json'
import Evolutions from '../dataFiles/evolutions.json'
import Moons from '../dataFiles/moons.json'
import Objectives from '../dataFiles/objectives.json'
import Envoys from '../dataFiles/envoys.json'
import SpecialShips from '../dataFiles/specialShips.json'
import Ages from '../dataFiles/ages.json'
import Wrenches from '../dataFiles/wrenches.json'
import Privileges from '../dataFiles/privileges.json'

export default function Home() {

  const navigate = useNavigate()

  const [alienCount, setAlienCount] = useState(238)
  
  useEffect(() => {
    getAlienCount()
    .then(data => {
      // console.log(data)
      setAlienCount(data)
    })
  }, [])

  let PageCount = 0;
  PageCount += alienCount;
  PageCount += Object.keys(Techs.technologies).length;
  PageCount += Object.keys(Hazards.hazards).length;
  PageCount += Object.keys(Stations.stations).length;
  PageCount += Object.keys(Lux.lux).length;
  PageCount += Object.keys(Evolutions.evolutions).length;
  PageCount += Object.keys(Moons.moons).length;
  PageCount += Object.keys(Objectives.objectives).length;
  PageCount += Object.keys(Envoys.envoys).length;
  PageCount += Object.keys(SpecialShips.ships).length;
  PageCount += Object.keys(Ages.ages).length;
  PageCount += Object.keys(Ages.master).length;
  PageCount += Object.keys(Wrenches.wrench).length;
  PageCount += Object.keys(Privileges.privilege).length;

  return (
    <div>
      <section className="hero text-center">
        <h1 className="hero__title">The Praw</h1>
        <p className="hero__subtitle">A Fan-Made Website for <a href="https://futurepastimes.com/cosmic-encounter-board-game">Cosmic Encounter</a></p>
        <Searchbar placeholder={`Search the Cosmos... ${PageCount} pages and counting`}/>
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