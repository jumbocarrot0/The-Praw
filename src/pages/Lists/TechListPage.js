import { Container } from 'reactstrap';
import Item from '../../components/Item'
import Techs from '../../dataFiles/technology.json';
import GridBrowser from "../../components/GridBrowser";
import Layout from '../../components/Layout'

export default function TechListPage() {
  return (
    <Layout>
      <h1 className='mb-4'>Technology</h1>
      <p className="text-light">Technology is an official variant introduced in the base set of Cosmic Encounter. In it, players draw tech cards and keep them facedown. Each regroup phase, a player may research a facedown tech using their ships. One fully researched, techs grant useful abilities to its owner.
        <br />
        The base set includes 20 regular tech cards. Cosmic Odyssey introduced an additional 25 tech cards, including new mili-tech and haz-tech types that are completed in different ways.</p>
      <hr class="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url="/Variants/Techs"
        content={Techs.technologies}
        border={(item) => {
          return {"Mili-Tech" : "success", "Haz-Tech" : "danger", "Tech": "warning"}[item.type];
        }}
        type={(item) => { return item.type }}
      />
    </Layout>
  );
}