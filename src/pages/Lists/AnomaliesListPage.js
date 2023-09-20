import Item from '../../components/Item'
import GridBrowser from "../../components/GridBrowser";
import Layout from '../../components/Layout'
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'
// import { Link } from "react-router-dom"

export default function AnomaliesPage() {
  return (
    <Layout title="Contracts">
      <h1 className='mb-4'>Anomalies</h1>
      <p className="text-light">Anomalies are a fan variant originally made by Jack Reda as 'Cosmic Stars' and was remade and mordernised by Jumbocarrot. It adds special abilities to each player's system.</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <h3>Setup</h3>
            <p className='text-light'>Perform the following steps:</p>
            <ol>
              <li className="text-light">Before selecting aliens, remove Pygmy from the set of aliens. Players cannot play as Pygmy in this variant.</li>
              <li className="text-light">In a 4-planet game, remove all anomalies with a ship requirement of 10 or higher.</li>
              <li className="text-light">Each player takes 2 random Anomalies and chooses 1 to keep, placing it in their home system.</li>
              <li className="text-light">If an Anomaly has <strong>Game Setup</strong> text, resolve it.</li>
            </ol>
            {/* <p className="text-light">These are copied from the Base Game rules.</p> */}
            <h3>Gameplay</h3>
            <ul>
              <li className="text-light">Most anomalies are <strong><em>used</em></strong> just like alien powers.</li>
              <li className="text-light">Each anomaly has a ship requirement on the bottom right of it, indicating how many ships a player needs in that system to control the anomaly.</li>
              <ul>
              <li className="text-light">Ships in a system include those on planets and moons. This does not include ships on techs or evolutions, captured ships, etc.</li>
              <li className="text-light">If an anomaly has a ship requirement of 'C', it is continuous, more on this later.</li>
              </ul>
              <li className="text-light">Players gain the <strong><em>use</em></strong> of any anomaly they meet the ship requirement for including those in their home system and any foreign systems.</li>
              <li className="text-light">Players may have the <strong><em>use</em></strong> of more than one anomaly.</li>
              <li className="text-light">If multiple players meet the ship requirement of an anomaly, they all have the <strong><em>use</em></strong> of it.</li>
              <ul>
              <li className="text-light">If multiple players use an anomaly simultaneously, use the timing conflicts rule to resolve it.</li>
              </ul>
              <li className="text-light">Anomalies can be canceled in all the ways an alien power can be canceled (e.g. Cosmic Zap). When an anomaly is canceled, it does not cancel anyone's alien power, and the anomaly may not be <strong><em>used</em></strong> by any player or the rest of the encounter, regardless of who <strong><em>used</em></strong> it.</li>
              <li className="text-light">Some anomalies have effects not linked to a <strong><em>use</em></strong> (e.g. Mineral Field). These effects are always active regardless of who has control of the anomaly and only activate once per timing window regardless of how many people control the anomaly.</li>
              <li className="text-light">Some anomalies are continuous, indicated on their timing bar and by a 'C' ship requirement. These anomalies have no use, and their effect is passive or automatic. Not every anomaly with a passive effect is continuous (e.g., Gas Giant).</li>
            </ul>
            <h3>Special Rules and Clarifications</h3>
            <ul>
              <li className="text-light">When playing with moons, a winning main player may only send one of their ships in the encounter to occupy an attached moon. This is important for planets that have multiple moons, which is possible with this variant (Gas Giant and Lunacy).</li>
              <li className="text-light">If Boomerang has Gas Giant in their system, for as long as they have a home colony on the Gas Giant, they are treated as having 3 home planets in their system for the purposes of their alternative win condition.</li>
              <li className="text-light">Leviathan may use the Gas Giant or a star dust token with their power, treated like a planet, as these anomalies only care if they are moved into another system (not onto the hyperspace gate).</li>
              <li className="text-light">Voyager, like Leviathan, may also use the Gas Giant or a star dust token as a warp-world. </li>
              <li className="text-light">Pygmy is excluded from this variant due to the Cluster anomaly (which reimplements Pygmy), Gas Giant, and Star Dust. All these dramatically change the composition of a home system, which does not play nicely with Pygmy.</li>
              <li className="text-light">Hot Earth is a slight reimplementation of Poison. You may remove one or the other from plal in this variant if you don't like the overlap.</li>
            </ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
    </Layout>
  );
}