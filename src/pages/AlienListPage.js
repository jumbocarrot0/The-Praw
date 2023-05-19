import { useSearchParams } from 'react-router-dom'
import {
  Container
} from 'reactstrap';
import { Link } from "react-router-dom"
import Aliens from '../dataFiles/originalAliens.json';
// import revisedAlienData from '../dataFiles/revisedAliens.json';

export default function AliensListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  return (
    <main>
      <Container>
        <h1>Aliens</h1>
        <ul>
          {Object.keys(Aliens.aliens).map((i) => {
            if (Aliens.aliens[i].name.includes(search)) {
              return <li key={i}><Link to={"/Aliens/" + i} reloadDocument>{Aliens.aliens[i].name}</Link></li>
            }
          })}
        </ul>
      </Container>
    </main>
  );
}