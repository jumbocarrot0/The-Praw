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

export default function SpecialShipsPage() {
  return (
    <Layout title="Special Ships">
      <h1 className='mb-4'>Special Ships</h1>
      <p className="text-light">Special Ships is an official variant in Cosmic Dominion, but with most of its content designed by fans. In it, each player is given a special ship with a unique ability.</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <h3>Setup</h3>
            <ul>
              <li className="text-light">Each player takes their color ship marker and places it faceup on one of their ships.</li>
              <li className="text-light">Shuffle the special ship deck and deal each player 2 special ship cards. Each player chooses one to keep and discards the rest.</li>
              <li className="text-light">Once all players have chosen a special ship card, they are all revealed.</li>
            </ul>
            {/* <p className="text-light">These are copied from the Base Game rules.</p> */}
            <h3>Gameplay</h3>
            <ul>
              <li className="text-light">Each player can use their special ship's ability card for as long as their ship is in the game.</li>
              <li className="text-light">A special ship card has a special named ability, which requires the ship to be exhausted to use.</li>
              <li className="text-light">Some special ships also have a <strong>Passive</strong> ability, which always functions even if the ship is exhausted.</li>
              <li className="text-light">If a special ship is exhausted, its marker is flipped facedown.</li>
              <li className="text-light">A player may “recharge” their special ship by forfeiting to have a second encounter, flipping their special ship's marker face up and letting it be exhausted again.</li>
              <li className="text-light">A special ship is automatically recharged when it is retrieved from the warp.</li>
              <li className="text-light">If a player's special ship is captured or removed from the game, the special ship marker is discarded.</li>
              <li className="text-light">At the start of a player's turn, if they have a special ship card but do not have a special ship marker on any of their ships in the game (including those in the warp), then they may place their marker on any one of their ships, designating it as their new special ship.</li>
            </ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
    </Layout>
  );
}