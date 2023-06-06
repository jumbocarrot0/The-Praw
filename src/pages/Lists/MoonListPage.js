import { Container } from 'reactstrap';
import Item from '../../components/Item'
import Moons from '../../dataFiles/moons.json';
import GridBrowser from "../../components/GridBrowser";
import Layout from '../../components/Layout'

export default function MoonListPage() {
  return (
    <Layout>
      <h1 className='mb-4'>Moons</h1>
      <p className="text-light">Moons are an official variant originally introduced in the 5th expanion of the Eons editions, and reimplemented in the FFG edition in Cosmic Odyssey. In it, players start with moons attached to two planets in their system. When a player wins an encounter on a planet with a moon, they may gain control of the moon and get to use its effect. Some moons have ongoing effects, some are one-time effects.
        <br />
        Cosmic Odyssey introduced 88 space stations across 9 different types of moons.</p>
      <hr class="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item} noSort={true}
        url="/Variants/Moons"
        content={Moons.moons}
        border={(item) => {
          const types = {"Cheesy Moon" : "success", "Blue Moon" : "primary", "Full Moon": "warning", "Half Moon": "indigo", "Hub Moon": "orange", "New Moon": "danger", "Quarter Moon": "danger-subtle", "Secret Moon": "primary-subtle"}
          return types[item.type] ? types[item.type] : "secondary";
        }}
        type={(item) => { return item.type }}
        width={4}
      />
    </Layout>
  );
}