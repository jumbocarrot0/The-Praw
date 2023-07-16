import Item from '../../components/Item'
import Moons from '../../dataFiles/moons.json';
import GridBrowser from "../../components/GridBrowser";
import Layout from '../../components/Layout'
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'

export default function MoonListPage() {
  return (
    <Layout title="Moons">
      <h1 className='mb-4'>Moons</h1>
      <p className="text-light">Moons are an official variant originally introduced in the 5th expanion of the Eons editions, and reimplemented in the FFG edition in Cosmic Odyssey. In it, players start with moons attached to two planets in their system. When a player wins an encounter on a planet with a moon, they may gain control of the moon and get to use its effect. Some moons have ongoing effects, some are one-time effects.
        <br />
        Cosmic Odyssey introduced 88 space stations across 9 different types of moons.</p>
      <hr className="border border-light border-2 opacity-100 mb-3" />
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <p className="text-light">These are copied from the Cosmic Odyssey campaign guide, with additional writing about each moon type.</p>
            <h3>Setup</h3>
            <ul>
              <li className="text-light">Sort the moon tokens by type and place them where players can reach them. Shuffle the moon card deck. Deal each player three moon cards. Each player chooses one to discard and then finds the moon tokens that correspond to their other two cards.</li>
              <li className="text-light">Each player attaches each of their moons to different planets in their home system and places the matching moon cards facedown in their play area.</li>
            </ul>
            <h3>Gameplay</h3>
            <ul>
              <li className="text-light">Players can look at the effects of any moons in their system at any time.</li>
              <li className="text-light">When a main player wins an encounter on a planet with an attached moon, they may send one of their ships in the encounter to occupy that moon if there is not already a ship occupying it. Winning allies cannot send a ship to an attached moon. If the offense occupies the moon, they take the corresponding moon card from the system owner. When a moon is occupied, its card is revealed and the effect is resolved; some moons can be revealed later by the player occupying the moon, per the timing specified on the card.</li>
              <li className="text-light">If a player occupies a moon, they are treated as having a colony on the attached planet, even if that player has no ships on the attached planet.</li>
              <li className="text-light">Ships occupying moons can be used to defend the planet or be moved. If a moon becomes unoccupied, its ability is no longer active.</li>
              <li className="text-light">When making deals, if a player would gain a colony on a planet with an unoccupied moon, whether or not a ship can be sent to the moon must be a part of the terms of the deal.</li>
              <li className="text-light">If the attached planet is moved or destroyed, the moon and its corresponding card are removed from the game. Any ship on the moon moves to the planet if applicable, otherwise the ship goes to the warp.</li>
              <li className="text-light">Effects that specifically target ships on a planet do not affect a ship on the attached moon.</li>
              <li className="text-light">If also using the Space Stations variant, a moon cannot be attached to a planet that has an attached space station or sky city.</li>
            </ul>
            <h3>Moon Types</h3>
            <p className="text-light">Cosmic Odyssey has 9 types of moons:</p>
            <ul>
              <li className="text-light">Quarter Moons have an immediate effect that trigger when revealed. Unlike other moons, quarter moons are flipped back facedown when unoccupied.</li>
              <li className="text-light">Half Moons have an ongoing effect that aid the player occupying it. Half moons become stronger when the occupier controls at least two half moons.</li>
              <li className="text-light">Full Moons have an ongoing effect that affect <strong>all</strong> players in the game, not just the player occupying it.</li>
              <li className="text-light">Blue Moons, unlike other moons, are not revealed when occupied. Instead they have a once per game ability that, like quarter moons, have an immediate effect that trigger when revealed. The occupier chooses when to reveal the blue moon but, unlike quarter moons, blue moons are not flipped back facedown.</li>
              <li className="text-light">Secret Moons, similar to blue moons, are not revealed when occupied. Unlike blue moons, they have an ongoing effect that aid the occupier that take effect only while the moon is revealed.</li>
              <li className="text-light">Moon Bases are treated as an addition foreign colony for the occupier, but have an ongoing negative effect for them.</li>
              <ul>
                <li className="text-light">If a player occupies a moon base, but has no ships on the planet, they are still treated as having a colony on that planet. So, a player occupying a moon base in a foreign system without ships on the attached planet will have 2 foreign colonies.</li>
              </ul>
              <li className="text-light">Hub Moons aid the occupier in deal situations.</li>
              <li className="text-light">Cheesy Moons have a wide array of effects, usually ongoing effects, with a shared theme of beiny silly, party-game-style effects.</li>
              <li className="text-light">New Moons, despite havings a common back, have effects that belong to one another type of moon. When a new moon is revealed, it is treated as the type of moon depicted on its other side. E.g., a new moon that becomes a half moon is treated as a half moon for other half moon card abilities.</li>
            </ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item} noSort={true}
        url="/Variants/Moons"
        content={Moons.moons}
        border={(item) => {
          const types = { "Cheesy Moon": "success", "Blue Moon": "primary", "Full Moon": "warning", "Half Moon": "indigo", "Hub Moon": "orange", "New Moon": "primary-subtle", "Quarter Moon": "danger-subtle", "Secret Moon": "danger" }
          return types[item.type] ? types[item.type] : "secondary";
        }}
        type={(item) => { return item.type }}
        width={4}
      />
    </Layout>
  );
}