import { useSearchParams } from 'react-router-dom'
import {
  Container
} from 'reactstrap';
import { Link } from "react-router-dom"
import Aliens from '../dataFiles/originalAliens.json';
// import revisedAlienData from '../dataFiles/revisedAliens.json';

export default function AliensListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = (searchParams.get('search') || '').toLowerCase();

  Aliens.aliens.sort(function(a, b) {
    const expansions = ["Base Set", "Cosmic Incursion", "Cosmic Conflict", "Cosmic Alliance", "Cosmic Storm", "Cosmic Dominion", "Cosmic Eons", "42nd Anniversary Edition", "Cosmic Odyssey"]
    console.log(a.expansion)
    if (expansions.findIndex((e) => e === a.expansion) < expansions.findIndex((e) => e === b.expansion)) {
      return -1;
    }
    else if (expansions.findIndex((e) => e === a.expansion) > expansions.findIndex((e) => e === b.expansion)) {
      return 1;
    } else {
      if (a.name < b.name) {
        return -1;
      }
      else if (a.name > b.name) {
        return 1;
      }
    }
    return 0;
  })

  return (
    <main>
      <Container>
        <h1>Aliens</h1>
        <ul>
          {Object.keys(Aliens.aliens).map((i) => {
            if (Aliens.aliens[i].name.toLowerCase().includes(search)) {
              return <li key={i}><Link to={"/Aliens/" + i} reloadDocument>{Aliens.aliens[i].name}</Link></li>
            }
            return null
          })}
        </ul>
      </Container>
    </main>
  );
}