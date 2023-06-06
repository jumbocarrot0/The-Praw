import { Container } from 'reactstrap';
import Item from '../../components/Item'
import Evolutions from '../../dataFiles/evolutions.json';
import GridBrowser from "../../components/GridBrowser";

export default function EvolutionListPage() {
  return (
    <Container>
      <h1 className='mb-4'>Evolutions</h1>
      <p className="text-light">Evolutions are an official variant introduced in Cosmic Odyssey. In it, 4 evolution cards are drawn at the start of the game, and each regroup phase players may place one of their ships onto an evolution card. Each evolution provides different effects to each player based upon how many ships they have on it. Some evolutions give negative effects if a player has too few ships on it.
        <br />
        Cosmic Odyssey introduced 14 evolution cards.</p>
      <hr class="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url="/Variants/Evolutions"
        content={Evolutions.evolutions}
        border={(item) => {
          return "success";
        }}
        type={(item) => { return null }}
      />
    </Container>
  );
}