import Item from '../../components/Item'
import GridBrowser from "../../components/GridBrowser";
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'
import { useRouteLoaderData } from 'react-router-dom';

export default function StationListPage() {

  const Stations = useRouteLoaderData("stations")

  return (
    <div>
      <h1 className='mb-4'>Space Stations</h1>
      <p className="text-light">Space Stations are an official variant introduced in Cosmic Storm. In it, players get control of stations attached to their planets, which they use the ability of for as long as they keep the planet.
        <br />
        Cosmic Storm introduced 10 stations. Cosmic Odyssey introduced an 26 stations and 2 new types of stations.</p>
      <hr className="border border-light border-2 opacity-100 mb-3" />
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <p className="text-light">These are copied from the Cosmic Odyssey campaign guide</p>
            <h3>Setup</h3>
            <ul>
              <li className="text-light">Shuffle the space station, deep space station, and sky city decks and deal one card from each deck to each player. Each player discards one of their cards.</li>
              <li className="text-light">Each player gains the markers that correspond to the cards they kept.</li>
              <li className="text-light">Each player with a space station card attaches its markers to one of their planets by placing it against one of planets in their home system.</li>
              <li className="text-light">Each player with a sky city card attaches its marker by placing it on top of one of their planets in their home system.</li>
              <li className="text-light">Each player with a deep space station card places its marker in front of their home system.</li>
              <li className="text-light">Return all unused space station cards, sky city cards, deep space station cards, and their corresponding markers to the box.</li>
            </ul>
            <h3>Gameplay</h3>
            <ul>
              <li className="text-light">Each station has an ability that can impact the game as described on its corresponding card. These abilities are not alien powers and therefore cannot be affected by game effects that interact with alien powers.</li>
              <li className="text-light">If a planet with an attached station is destroyed or otherwise removed from the game, the attached station is also destroyed and removed from the game.</li>
              <li className="text-light">Each station can be traded as part of a deal, either in addition to cards and colonies, or on its own. A player receiving a station places the newly acquired station as described in setup, but no planet can have more than one space station or sky city. A player can trade a station in their home system only if they have access to that station's ability.</li>
              <li className="text-light">If also using the Moons variant, a space station or sky city cannot be attached to a planet that has an attached moon.</li>
            </ul>
            <h3>Station Types</h3>
            <p className="text-light">There are three types of stations:</p>
            <ul>
              <li className="text-light">Space Stations are controlled by the player with the station's card if they have a colony on the planet its attached to.</li>
              <ul>
                <li className="text-light">While the system owner has no ships on a planet with an attached space station, they lose access to the ability of the space station and flip the corresponding space station card facedown. If they reestablish a colony on the planet, flip the corresponding space station card faceup.</li>
              </ul>
              <li className="text-light">Sky Cities work like space stations, except that any player with a colony on the planet with a sky city attached has access to its ability.</li>
              <li className="text-light">Deep space stations can only be controlled by the owner of the system they're in (they can of course be traded, changing the system its in).</li>
              <ul>
                <li className="text-light">If the owner of the system ever has fewer than four home colonies, that player loses access to the ability of their deep space station. Flip the corresponding space station card facedown</li>
              </ul>
            </ul>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Sub Variants</AccordionHeader>
          <AccordionBody accordionId="2">
            <p className="text-light">These are copied from the Cosmic Storm rulebook.</p>
            <h3>Space Station Conquest</h3>
            <p className="text-light">This variant allows players to acquire other players' space stations for their own use.</p>
            <ul>
              <li className="text-light">When a player wins an offensive encounter against a planet outside their home system which has a space station attached, that player <strong>Conquers</strong> that space station.</li>
              <li className="text-light">At the end of the resolution phase, the winning offensive player takes the space station card and its corresponding marker from the defending player.</li>
              <li className="text-light">They then attach the conquered space station to any planet in their home system which does not currently have an attached space station.</li>
              <li className="text-light">Space stations may still be traded as part of a deal as normal.</li>
              <li className="text-light">If a player acquires at least five space stations (four if playing with the Four Planets variant), that player wins the game! This victory condition is only available if enough space stations are in play.</li>
            </ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url="/Variants/Stations"
        content={Stations}
        border={(item) => {
          return { "Sky City": "success", "Space Station": "primary", "Deep Space Station": "indigo" }[item.type];
        }}
        type={(item) => { return item.type }}
        width={3}
      />
    </div>
  );
}