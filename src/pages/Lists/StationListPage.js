import { Container } from 'reactstrap';
import Item from '../../components/Item'
import Stations from '../../dataFiles/stations.json';
import GridBrowser from "../../components/GridBrowser";

export default function StationListPage() {
  return (
    <Container>
      <h1 className='mb-4'>Space Stations</h1>
      <p className="text-light">Space Stations are an official variant introduced in Cosmic Storm. In it, players get control of stations attached to their planets, which they use the ability of for as long as they keep the planet.
        <br />
        Cosmic Storm introduced 10 stations. Cosmic Odyssey introduced an 26 stations and 2 new types of stations.</p>
      <hr class="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url="/Variants/Stations"
        content={Stations.stations}
        border={(item) => {
          return {"Sky City" : "success", "Space Station" : "primary", "Deep Space Station": "secondary"}[item.type];
        }}
        type={(item) => { return item.type }}
      />
    </Container>
  );
}