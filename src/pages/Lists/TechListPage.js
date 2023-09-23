import Item from '../../components/Item'
import Techs from '../../dataFiles/technology.json';
import GridBrowser from "../../components/GridBrowser";
import Layout from '../../components/Layout'
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'

export default function TechListPage() {

  return (
    <div>
      <h1 className='mb-4'>Technology</h1>
      <p className="text-light">Technology is an official variant introduced in the base set of Cosmic Encounter. In it, players draw tech cards and keep them facedown. Each regroup phase, a player may research a facedown tech using their ships. One fully researched, techs grant useful abilities to its owner.
        <br />
        The base set includes 20 regular tech cards. Cosmic Odyssey introduced an additional 25 tech cards, including new mili-tech and haz-tech types that are completed in different ways.</p>
      <hr className="border border-light border-2 opacity-100 mb-3" />
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <p className="text-light">These are copied from the Cosmic Odyssey campaign guide</p>
            <h3>Setup</h3>
            <ul>
              <li className="text-light">Shuffle the tech deck and deal two cards from the deck to each player.</li>
              <li className="text-light">Then, each player chooses one of the cards to place facedown in their play area and discards the other faceup in the tech discard pile.</li>
            </ul>
            <h3>Gameplay</h3>
            <ul>
              <li className="text-light">Each player can look at their facedown tech cards at any time.</li>
              <li className="text-light">At the start of each regroup phase, before the offense retrieves one of their ships from the warp, each player may do one of the following: research a tech, complete a tech, or abandon a tech.</li>
              <li className="text-light">To <strong>research</strong> a tech card, the player places a ship from any of their colonies on one of their facedown tech cards.</li>
              <li className="text-light">To <strong>complete</strong> a tech card, if the number of ships on a tech card is equal to or greater than the research number on the card, the player can flip the card faceup and return those ships to their colonies. The player reads it aloud and gains the ability.</li>
              <li className="text-light">To <strong>abandon</strong> a tech card, the player returns any ships on the card to their colonies and discards the card to the tech discard pile.</li>
              <li className="text-light">After the offense has a successful encounter, instead of having a second encounter, that player may choose to draw a number of tech cards equal to one plus the number of foreign colonies they have. Then, they choose one card to place facedown in their play area and discard the others.</li>
              <li className="text-light">If the tech deck is empty, shuffle its discard pile and make a new deck.</li>
              <li className="text-light">Tech cards can be traded in deals. Traded tech cards maintain the state of research they have. If a partially researched tech is traded, the receiving player may place as many ships as the player giving the tech has on it. Then, whether or not the receiving player placed ships, the player giving the tech returns all of their ships on it to their colonies.</li>
              <li className="text-light">Some tech card abilities <strong>reset</strong> the card. To reset the card, it is flipped back facedown and all of the ships on it are returned to the player’s colonies. The card can be researched again.</li>
            </ul>
            <h3>Tech Types</h3>
            <p className="text-light">Cosmic Odyssey added two new types of tech cards on top of the standard tech:</p>
            <ul>
              <li className="text-light">Haz-Tech, which do not have a specific number of ships needed to complete them, but they have effects that scale based on the number on it. These techs cannot be completed; instead, they can be revealed when a hazard warning has been drawn during an encounter.</li>
              <li className="text-light">Mili-Tech, which are not researched, but are completed during a single regroup phase by the player discarding attack cards from their hand. There are three types of Mili-Techs:</li>
              <ul>
                <li className="text-light"><strong>X=X</strong>: The player discards two attack cards with the same value (e.g. 08, 08).</li>
                <li className="text-light"><strong>X+1</strong>: The player discards two attack cards with sequential values (e.g. 04, 05).</li>
                <li className="text-light"><strong>≥[#]</strong>: The player discards any number of attack cards whose values sum to equal to or greater than the number listed.</li>
              </ul>
            </ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url="/Variants/Techs"
        content={Techs.technologies}
        border={(item) => {
          return { "Mili-Tech": "success", "Haz-Tech": "danger", "Tech": "warning" }[item.type];
        }}
        type={(item) => { return item.type }}
      />
    </div>
  );
}