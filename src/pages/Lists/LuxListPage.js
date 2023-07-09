import Item from '../../components/Item'
import Lux from '../../dataFiles/lux.json';
import GridBrowser from "../../components/GridBrowser";
import Layout from '../../components/Layout'
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'

export default function LuxListPage() {
  return (
    <Layout title="Lux Cards">
      <h1 className='mb-4'>Lux</h1>
      <p className="text-light">Lux is an official variant introduced in Cosmic Odyssey. The variant adds a currency to the game, which players earn by being a main player. Players are also given lux cards that provide unique ways to spend lux, and may also spend lux to earn rewards at any time.
        <br />
        Cosmic Odyssey introduced 24 double sized lux cards.</p>
      <h2>Trivia</h2>
      <ul>
        <li className="text-light">Lux is a reimplementation of the Lucre variant from expansion 6 of the Eon Edition of the game.</li>
      </ul>
      <hr className="border border-light border-2 opacity-100 mb-3" />
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <p className="text-light">These are copied from the Cosmic Odyssey campaign guide</p>
            <h3>Setup</h3>
            <ul>
              <li className="text-light">Create the lux deck by flipping all of the lux cards to their lux market sides and shuffling them. Deal each player two lux cards.</li>
              <li className="text-light">After each player looks at the other side of their cards, they choose one of their cards and flip it over. Place the lux and ultra lux tokens in separate piles where players can reach them.</li>
              <li className="text-light">Place the lux and ultra lux tokens in separate piles where players can reach them.</li>
            </ul>
            <h3>Gameplay</h3>
            <ul>
              <li className="text-light">During the launch phase, the offense takes four lux tokens and places a number of them near the targeted planet equal to the number of ships that they launched. Then, they place the remaining lux tokens near the hyperspace gate. For example, if the offense launches one ship, they place one lux token near the planet and three lux tokens near the gate. If exactly three lux tokens would be placed on one side, those three tokens are replaced with one ultra lux token instead. After launching ships, if there are fewer than four lux tokens left in the supply, lux tokens are placed near the hyperspace gate first before placing any near the planet.</li>
              <li className="text-light">During the resolution phase, after any defender rewards are gained and compensation is collected, the offense gains all of the tokens near the hyperspace gate and <em className="text-decoration-underline">the system owner</em> collects all of the tokens near the targeted planet.</li>
              <li className="ms-5 text-light">Unless the offense is attacking their home system, or an alien like Will, Worm or Delegator is in play, the system owner is the defense.</li>
              <li className="text-light">Lux and ultra lux tokens can be traded as part of a deal.</li>
              <li className="text-light">Lux and ultra lux tokens can be given to another player at any time in exchange for promises or favors, although these promises are not binding.</li>
              <li className="text-light">While each lux token is worth 1 Lux, ultra lux tokens are worth 3 Lux. If a player is paying for an effect that costs less than 3 Lux, the difference is not recovered as lux tokens. For example, if paying for an effect that costs 2 Lux with an ultra lux token, the player does not gain one lux token. Ultra lux tokens cannot be exchanged for lux tokens otherwise.</li>
            </ul>
            <h3>Lux Card Types</h3>
            <p className="text-light">Each player has one card that is on the lux market side while the other card will be of a different type. Each of the lux market sides are the same while the other side is one of three different types which each share a mechanical theme.</p>
            <ul>
              <li className="text-light">With Lux Market cards, during each player's regroup phase, the offense makes a choice about who is able to spend Lux to purchase rewards. As presented in the base game, when a player gains a reward, they either draw one card from the cosmic deck or recover one ship from the warp. If also using the Reward Deck variant, the player can draw one reward card instead. As expressed in shorthand on the card, the three choices are as follows:</li>
              <li className="ms-5 text-light"><strong>3 Lux: Only offense -</strong> If the offense chooses this, only the offense may spend Lux to receive rewards at a rate of 3 Lux per reward.</li>
              <li className="ms-5 text-light"><strong>2 Lux: Offense and another player who agrees -</strong> If the offense chooses this, they also invite one other player. If that player accepts, the offense and this other player can receive rewards at a rate of 2 Lux per reward. Otherwise, the offense can choose another player or another option.</li>
              <li className="ms-5 text-light"><strong>1 Lux: Everybody -</strong> If the offense chooses this, every player can receive rewards at a rate of 1 Lux per reward.</li>
              <li className="text-light">Re-Lux cards provide an additional way for its owner to gain additional lux tokens.</li>
              <li className="text-light">De-Lux cards provide an additional way for all players to spend Lux to gain an ability. The card's owner spends Lux for the ability while every other player has to pay the owner to use it. Other players do not need to ask permission to use the ability.</li>
              <li className="text-light">Ultra Lux cards can spend ultra lux tokens to gain powerful abilities. The card's owner cannot spend regular lux tokens to resolve the ability, they need to spend ultra lux tokens. (Remember, players can trade lux and ultra lux tokens with each other at any time.)</li>
            </ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <GridBrowser cardTemplate={Item}
        url="/Variants/Lux"
        content={Lux.lux}
        border={(item) => {
          return {"De-Lux" : "info", "Re-Lux" : "success", "Ultra Lux": "danger"}[item.type];
        }}
        type={(item) => { return item.type }}
      />
    </Layout>
  );
}