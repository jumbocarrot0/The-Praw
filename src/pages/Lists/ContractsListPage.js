import Item from '../../components/Item'
import GridBrowser from "../../components/GridBrowser";
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'
// import { Link } from "react-router-dom"

export default function ContractsPage() {
  return (
    <div>
      <h1 className='mb-4'>Contracts</h1>
      <p className="text-light">Contracts are a fan-made variant by LordAscapelion. It changes the rules behind deal to make them less repetitive.</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <h3>Setup</h3>
            <ul>
              <li className="text-light">Shuffle the contracts deck and place it in the center of the play area within reach of all players.</li>
            </ul>
            {/* <p className="text-light">These are copied from the Base Game rules.</p> */}
            <h3>Gameplay</h3>
            <ul>
              <li className="text-light">Whenever a deal situation occurs (typically via both main players playing a Negotiate), the offense draws and reveals the top card of the contracts deck.</li>
              <li className="text-light">The drawn contract will establish some additional term(s) of the deal. Typically, a player will have to gain some benefit or drawback.</li>
              <li className="text-light">As part of the deal, the players involved in the deal must decide how they will fulfill the terms of the contract within the time limit of the deal.</li>
              <li className="text-light">If the players do not agree on how to fulfill the contract within the time limit, the deal will fail. (The deal will still fail if they do agree on how to fulfill the contract, but no colonies or cards are traded.)</li>
              <li className="text-light">If the deal succeeds, the terms of the contract are carried out as the players agreed to do so.</li>
            </ul>
            <h3>Contract Types</h3>
            <p className="text-light">There are three types of contracts.</p>
            <ul>
              <li className="text-light">Each contract not labeled otherwise is a standard contract. These are usually discarded once their terms have been carried out at the end of the deal unless stated otherwise.</li>
              <li className="text-light">Promissory notes give two players a long-term, binding deal.</li>
              <ul>
                <li className="text-light">When a promissory note is drawn, for the deal to succeed, it must be agreed which player in the deal will receive the promissory note, and which other player in the deal must 'sign' it (typically this will be the player in the deal who did not receive the promissory note).</li>
                <li className="text-light">If players do not reach an agreement on who receives the card within the time limit, the deal fails.</li>
                <li className="text-light">When a player receives a promissory note, they keep it face up in their play area.</li>
                <li className="text-light">A player 'signs' a promissory note by taking any one ship of their color and placing it on the card. </li>
                <li className="text-light">The 'signee' of a promissory note is the player whose ship is on the promissory note.</li>
                <li className="text-light">A player with a promissory note may use the promissory note as specified on the card. When a promissory note is discarded, the ship on the card returns to one of the signee's colonies of their choice.</li>
              </ul>
              <li className="text-light">Each contract with a timing bar that is not a promissory note is a card-tract.</li>
              <ul>
                <li className="text-light">As part of the deal, the players involved in the deal must decide which player will add the card-tract to their hand. The card-tract may be later played for its effect.</li>
                <li className="text-light">Discarded card-tracts return to the contract discard pile and are treated as their own card type (i.e., for Plague, Hate, etc.) unless specified otherwise.</li>
              </ul>
            </ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
    </div>
  );
}