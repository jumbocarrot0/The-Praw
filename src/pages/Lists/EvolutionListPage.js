import Item from '../../components/Item'
import Evolutions from '../../dataFiles/evolutions.json';
import GridBrowser from "../../components/GridBrowser";
import Layout from '../../components/Layout'
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'

export default function EvolutionListPage() {
  return (
    <div>
      <h1 className='mb-4'>Evolutions</h1>
      <p className="text-light">Evolutions are an official variant introduced in Cosmic Odyssey. In it, 4 evolution cards are drawn at the start of the game, and each regroup phase players may place one of their ships onto an evolution card. Each evolution provides different effects to each player based upon how many ships they have on it. Some evolutions give negative effects if a player has too few ships on it.
        <br />
        Cosmic Odyssey introduced 14 evolution cards.</p>
      <hr className="border border-light border-2 opacity-100 mb-3" />
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <p className="text-light">These are copied from the Cosmic Odyssey campaign guide</p>
            <h3>Setup</h3>
            <ul>
              <li className="text-light">Shuffle the evolution deck and place four evolution cards faceup within reach of all players.</li>
            </ul>
            <h3>Gameplay</h3>
            <ul>
              <li className="text-light">Each player is granted the ability from each evolution card based on the number of ships that they have on that card. Each card grants the ability that corresponds to their number of ships and not any abilities granted by fewer ships.</li>
              <li className="text-light">During each regroup phase, starting with the offense and proceeding clockwise, each player may place one of their ships from any of their colonies on one of the evolution cards or move one of their ships from one evolution card to another.</li>
              <li className="text-light">When a player launches or sends ships during an encounter, they can take ships from evolution cards. After the encounter, if the player needs to return those ships, they cannot place them back on evolution cards; they must place those ships on any of their colonies instead.</li>
            </ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url="/Variants/Evolutions"
        content={Evolutions.evolutions}
        border={(item) => {
          return "success";
        }}
        type={(item) => { return null }}
      />
    </div>
  );
}