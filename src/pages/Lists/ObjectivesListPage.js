import Item from '../../components/Item'
import GridBrowser from "../../components/GridBrowser";
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'
import { useRouteLoaderData } from 'react-router-dom';

export default function ObjectivesListPage() {

  const Objectives = useRouteLoaderData("objectives")

  return (
    <div>
      <h1 className='mb-4'>Objectives</h1>
      <p className="text-light">Objectives are an official variant introduced in Cosmic Odyssey. It is intended primarially with use in the Campaign Mode but can be used as a standalone variant as well. The variant adds an objectives deck, with 4 objectives drawn at the start of the game. At the end of the game, the winner is not the first player to 5 foreign colonies (although that is how the game ends), but the player who scores the most points.
        <br />
        Cosmic Odyssey introduced 16 objective cards.</p>
      <hr className="border border-light border-2 opacity-100 mb-3" />
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <p className="text-light">These are copied from the Cosmic Odyssey campaign guide</p>
            <h3>Setup</h3>
            <ul>
              <li className="text-light">Shuffle the objective deck and place it in the play area. Deal four objective cards faceup within reach of all players.</li>
            </ul>
            <h3>Gameplay</h3>
            <ul>
              <li className="text-light">During scoring, each player's score is determined for the sake of ranking, including that of the winning players. This means that the player(s) that ended the game may not get 1st ranking. The score of each player who won the game using an alternative win condition is still ignored, as they are treated as having a higher score than the player who has the highest score.</li>
              <li className="text-light">Each player adds to their score the number printed on the objectives of which they fulfilled the requirements. If multiple people fulfill the requirements, they each add the corresponding amount to their score.</li>
            </ul>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Hidden Objectives</AccordionHeader>
          <AccordionBody accordionId="2">
            <p className="text-light">These are copied from the Cosmic Odyssey campaign guide, with some modification for clarity.</p>
            <h3>Hidden Objective</h3>
            <p className="text-light">Similar to the Array Objective variant, this variant gives a player an alternative way to increase their score.</p>
            <ul>
              <li className="text-light">At the start of the game, shuffe the objective deck and deal two objective cards to the players with a hidden objective (this is decided through another effect like a master or wrench card, or can be decided at game start).</li>
              <li className="text-light">Each player dealt objectives chooses one to keep, placing it facedown in front of themself, and shuffle the other into the objective deck.</li>
              <li className="text-light">A player can look at their objective at any time. During scoring, only the player with the hidden objective adds to their score the number printed on the card (if they fulfill the requirement)</li>
            </ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url="/Variants/Objectives"
        content={Objectives}
        border={() => {
          return "indigo";
        }}
        type={() => { return null }}
        width={4}
      />
    </div>
  );
}