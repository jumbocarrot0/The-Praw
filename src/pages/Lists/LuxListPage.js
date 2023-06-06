import { Container } from 'reactstrap';
import Item from '../../components/Item'
import Lux from '../../dataFiles/lux.json';
import GridBrowser from "../../components/GridBrowser";

export default function LuxListPage() {
  return (
    <Container>
      <h1 className='mb-4'>Lux</h1>
      <p className="text-light">Lux is an official variant introduced in Cosmic Odyssey. The variant adds a currency to the game, which players earn by being a main player. Players are also given lux cards that provide unique ways to spend lux, and may also spend lux to earn rewards at any time.
        <br />
        Cosmic Odyssey introduced 24 double sized lux cards.</p>
      <h2>Trivia</h2>
      <ul>
        <li className="text-light">Lux is a reimplementation of the Lucre variant from expansion 6 of the Eon Edition of the game.</li>
      </ul>
      <hr class="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url="/Variants/Lux"
        content={Lux.lux}
        border={(item) => {
          return {"De-Lux" : "info", "Re-Lux" : "success", "Ultra Lux": "danger"}[item.type];
        }}
        type={(item) => { return item.type }}
      />
    </Container>
  );
}