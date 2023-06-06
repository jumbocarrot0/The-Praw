import { Container } from 'reactstrap';
import Item from '../../components/Item'
import Objectives from '../../dataFiles/objectives.json';
import GridBrowser from "../../components/GridBrowser";

export default function HazardListPage() {
  return (
    <Container>
      <h1 className='mb-4'>Objectives</h1>
      <p className="text-light">Objectives are an official variant introduced in Cosmic Odyssey. It is intended primarially with use in the Campaign Mode but can be used as a standalone variant as well. The variant adds an objectives deck, with 4 objectives drawn at the start of the game. At the end of the game, the winner is not the first player to 5 foreign colonies (although that is how the game ends), but the player who scores the most points.
        <br />
        Cosmic Odyssey introduced 16 objective cards.</p>
      <hr class="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url="/Variants/Objectives"
        content={Objectives.objectives}
        border={(item) => {
          return "indigo";
        }}
        type={(item) => { return null }}
        width={4}
      />
    </Container>
  );
}