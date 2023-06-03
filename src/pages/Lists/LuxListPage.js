import { Container } from 'reactstrap';
import Item from '../../components/Item'
import Lux from '../../dataFiles/lux.json';
import GridBrowser from "../../components/GridBrowser";

export default function LuxListPage() {
  return (
    <Container>
      <h1 className='mb-4'>Hazards</h1>
      <p className="text-light">Hazards are an official variant introduced in Cosmic Conflict. The variant adds an additional hazard deck which is drawn from whenever a destiny card with a hazard warning is drawn (which is roughly 25% of the destiny deck).
        <br />
        Cosmic Conflict introduced 17 hazard cards, 8 of which had duplicated to create a 24-card deck. Cosmic Odyssey introduced an additional 26 cards to bring the total up to 50 hazard cards.</p>
      <h2>Trivia</h2>
      <ul>
        <li className="text-light">Alt-Hazards were originally called Armistices during playtesting.</li>
      </ul>
      <hr class="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url="/Variants/Lux"
        content={Lux.lux}
        border={(item) => {
          return {"De-Lux" : "info", "Re-Lux" : "success", "Ultra Lux": "danger"}[item.type];
        }}
      />
    </Container>
  );
}