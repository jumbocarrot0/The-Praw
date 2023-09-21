import Item from '../../components/Item'
import Envoys from '../../dataFiles/envoys.json';
import GridBrowser from "../../components/GridBrowser";
import Layout from '../../components/Layout'
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'
// import { Link } from "react-router-dom"

export default function EnvoysPage() {
  return (
    <Layout title="Envoys">
      <h1 className='mb-4'>Envoys</h1>
      <p className="text-light">Envoys are an official component of the Campaign mode in Cosmic Odyssey, but it does not have its own offical variant. The rules on this page are fan made, although not very experimental.</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <h3>Setup</h3>
            <ul>
              <li className="text-light">Shuffle the Envoys deck and deal each player a random envoy. This envoy is kept faceup next to that player's chosen alien (even if using the hidden aliens variant).</li>
            </ul>
            {/* <p className="text-light">These are copied from the Base Game rules.</p> */}
            <h3>Gameplay</h3>
            <ul>
              <li className="text-light">Envoys are additional alien powers and are treated in all ways as such. Each player may use the power of their envoys like alien powers.</li>
              <li className="text-light">Envoys can be zapped and canceled in all the same ways, and are lost in all the same ways as a standard alien power (i.e., by having too few home colonies).</li>
            </ul>
          </AccordionBody>
        </AccordionItem>
        <hr className="border border-light border-2 opacity-100 mb-5" />
      </UncontrolledAccordion>
      <GridBrowser cardTemplate={Item}
        noSort={true}
        url="/Variants/Envoys"
        content={Envoys.envoys}
        border={(envoy) => {
          const borders = { "Cosmic Odyssey": "success", "Fan Made": "indigo" };
          return borders[envoy.expansion];
        }}
        type={() => { return null }}
        width={4}
      />
    </Layout>
  );
}