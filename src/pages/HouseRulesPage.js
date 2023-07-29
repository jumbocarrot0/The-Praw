import Layout from '../components/Layout'
import {
  Button,
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'
import { Link } from "react-router-dom"
import Aliens from '../dataFiles/aliens.json';

function AccordionAlienBody(props){
  return (<AccordionBody accordionId={props.accordionId}>
  <Link to={`/Aliens/${props.alienId}`}>
    <Button color="primary" className='mb-3'>
      Go to Alien Page
    </Button>
  </Link>
  <img alt={Aliens.aliens[props.alienId].original.name + " Thumbnail"}
    className='float-end'
    src={require(`../images/alien icons/${Aliens.aliens[props.alienId].original.thumbnail}`)}
  />
    {props.children}
</AccordionBody>)
}


export default function HouseRulesPage() {
  return (
    <Layout title="House Rules">
      <h1 className='mb-4'>House Rules</h1>
      <p className="text-light">Cosmic Encounter has a lot of components, including aliens and various cards for its many variants. Throughout their release, the playerbase has noted that some of these components have issues with them that render them unfun. This may be due to a rules issue, which this site corrects on each item's page, but sometimes its due to a more opinionated stance on whether an alien or other component is too weak or too obtrusively strong.
        <br /><br />
        This page is dedicated to listing some common, more opinionated changes, to these components that don't really belong as a proper 'revision' to that component.</p>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <h2>Alien Changes</h2>
      <UncontrolledAccordion defaultOpen={[]} stayOpen={true}>
        <AccordionItem>
          <AccordionHeader targetId="arcade">
            Arcade - Cosmic Storm
          </AccordionHeader>
          <AccordionAlienBody alienId="9" accordionId="arcade">
            <p>
              As printed, Arcade is able to <em><strong>use</strong></em> their power whenever their side plays an attack card and their opponent plays a negotiate card. Typically this is fine as it results in a win, but in any scenario where Arcade's side loses in spite of playing an attack vs a negotiate (e.g. Pacifist, Human), it's counterintuitive that Arcade will pwn a ship and "dominate" even though they lost. The Praw recommends to change this so that Arcade needs to actually be winning in such a scenario in order for their power to be <em><strong>used</strong></em>.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="gambler">
            Gambler - Base Set
          </AccordionHeader>
          <AccordionAlienBody alienId="62" accordionId="gambler">
            <p>Gambler, as printed, cannot be used in the same game as <Link to="/Aliens/161">Sorcerer</Link>, since Gambler cannot bluff about a card they did not play. The official FAQ states that this restriction is, technically, optional as long as you don't mind Gambler having less power against Sorcerer.
            <br/><br/>
            If, however, you would like this restriction to be removed, then a popular house rule is that if Sorcerer uses their power against Gambler, then Gambler will simply bluff about their <em>opponent's</em> encounter card, the one Gambler originally played.
            <br/><br/>
            Although, even without any rules changes, Gambler's power isn't completely obsolete against Sorcerer. Since its ability is <em>optional</em>, it can choose to never bluff when Sorcerer swaps cards. Then then gives it an interesting advantage mind-games wise. Gambler knows that Sorcer is more likely to swap to prevent its power. So Gambler could play a bad card in case Sorcerer swaps, and if they don't swap, bluff that they played a good card. Or Gambler could play a good card in hopes Sorcerer doesn't swap for exactly the previous scenario, and catch them in a double bluff.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="healer">
            Healer - Base Set
          </AccordionHeader>
          <AccordionAlienBody alienId="75" accordionId="healer">
            <p>As printed, Healer is able to save ships sent to the warp <em>and</em> any ships removed from the game. The latter poses as a powerful counter to aliens like <Link to="/Aliens/181">Void</Link> and <Link to="/Aliens/145">Remote</Link>, which rely on removing ships from the game for their effect, and removes the fun out of other effects such as the <Link to="/Hazards/1">Black Hole</Link> hazard. As such, many players feel that Healer should <em>only</em> be able to affect ships sent to the warp.
              <br />
              <br />
              Moreover, Healer's healing is mandatory, players <em>must</em> retrieve their lost ships. This is also a powerful counter to aliens who rely on ships in the warp, most notably <Link to="/Aliens/98">Void</Link> but also aliens like <Link to="/Aliens/213">Lemming</Link>, <Link to="/Aliens/186">Warpish</Link>, <Link to="/Aliens/183">Voyager</Link>, etc.. It has been suggested that to alieviate this counter, that players healed by Healer do <em>not</em> have to retrieve their ships from the warp. To maintain the Healer's power, its recommended that Healer still receives their fee of 1 card from the deck regardless of if players retrieve their ship, but you may wish to experiment otherwise.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="masochist">
            Masochist - Base Set
          </AccordionHeader>
          <AccordionAlienBody alienId="98" accordionId="masochist">
            <p>
              A popular recommendation is to add 'Do Not Use with <Link to="/Aliens/75">Healer</Link>' to Masochist's power since, as printed, Healer will just prevent Masochist from having any ships in the warp. This is not required if you house rule Healer's healing to be optional of course, but you may wish to impose this anyways since Healer will gain a lot of cards from attemtping to heal the Masochist.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="meek">
            The Meek - Cosmic Odyssey
          </AccordionHeader>
          <AccordionAlienBody alienId="220" accordionId="meek">
            <p>
            The Meek, as printed, is a bit of a cumbersome alien to use. Using a colony marker in such an abnormal fashion, whilst an interesting concept, doesn't work for various practical and rules-breaking reasons. For one, its easy to nudge the colony markers and lose track of the Meek's true score. It also has poor interact with aliens like Plant, Reincarnator, etc.. <Link to="https://youtu.be/ahRh3CthMdg?t=1098">In his video covering Cosmic Odyssey aliens</Link>, designer Jack Reda mentioned that The Meek would've been clearer if it just gained and lost colonies explicitly, rather than fandangling around with the colony marker. The Praw supports this idea for an alternative Meek, as it maintains the core of the power whilst being much clearer.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="phantasm">
            Phantasm - Cosmic Storm
          </AccordionHeader>
          <AccordionAlienBody alienId="129" accordionId="phantasm">
            <p>
              Some suggest that Phantasm's power should be made optional in order to allow it to create deal situations naturally. Some further suggest that once Phantasm's power is <em><strong>used</strong></em> the card replacement should then be optional.
              <br/><br/>
              Another suggestion, this one by designer Jack Reda, is to keep the power mandatory, but <em>only</em> when neither player has revealed a negotiate card.
              <br/><br/>
              The Phantasm wild flare is also oddly strong, providing its holder an effect quite similar to Phantasm's power. The only nerf compared to Phantasm's power is that the flare's holder may only replace their own encounter card. However, compared to the Phantasm's power, the drawn encounter card may be discarded instead of replacing a card, and a drawn non-encounter card is added to the flare holder's hand. This is often seen as a stronger version of the Phantasm's power since its optional, and has a much higher chance of gaining it holder <em>something</em>. From experience, the player with the Phantasm's power may feel like they have the short end of the stick here. The Praw recommends to eliminate the stronger aspects of the Phantasm wild flare, so that a drawn non-encounter card to be simply discarded, much like with the Phantasm's power, and a drawn encounter card <em>must</em> replace the flare holder's encounter card. Its still quite useful even in this state, but it becomes a last-ditch hail mary play rather than something that's played every single opportunity.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="porcupine">
            Porcupine - Cosmic Storm
          </AccordionHeader>
          <AccordionAlienBody alienId="135" accordionId="porcupine">
            <p>
              Some players suggest that Porcupine should be allowed to <strong><em>use</em></strong> their power even when their side is not losing the encounter. This allows Porcupine to use their power to ditch undesirable cards, even if their side is already winning, or potentially to cause their side to lose when they would otherwise win.<br/><br/>
              The Praw does highlight that letting Porcupine use their power when winning does make them a more unreliable ally, since they have the ability to throw the encounter, which may result in them being invited less.<br/><br/>
              The Praw also recommends to treat Porcupine as a green alert alien, since its power is simple and can be grasped easily by new players. The only hitch is that a new player may overvalue certain cards, but The Praw believes that even beginners to the game can grasp the weakness of an attack 00 or a negotiate.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="remora">
            Remora - Base Set
          </AccordionHeader>
          <AccordionAlienBody alienId="144" accordionId="remora">
            <p>
              Some players feel that Remora's power is severely hindered when the Reward deck variant is used, since Remora cannot <em><strong>use</strong></em> their power when players draw from that deck. Some players recommend to let Remora draw from the rewards deck anyways. The Praw recommends a slightly different change that allows Remora to <strong><em>use</em></strong> its power whenever players draw cards from any deck into their hand, but that Remora only ever draws cards from the cosmic deck when <em><strong>using</strong></em> its power, regardless of the deck the original player drew from. This retains Remora's strength whenever the reward deck is played, without buffing it by giving it easy access to powerful reward cards.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="schizoidat">
            Schizoid (AT) - Cosmic Odyssey
          </AccordionHeader>
          <AccordionAlienBody alienId="235" accordionId="schizoidat">
            <p>
              As printed, the alternate timeline Schizoid replaces the normal victory condition with any one condition on their sheet, including any faceup conditions revealed as players win against Schizoid. Many feel this goes against the core idea of Schizoid, which should only have a secret condition. It also can lead to anti-climatic games, where a revealed condition may suddenly end the game. The Praw recommends to house rule this so that only the facedown condition replace the normal victory conditions, not least because designer Jack Reda has confirmed that this is not the alien's intent.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="tide">
            Tide - Cosmic Storm
          </AccordionHeader>
          <AccordionAlienBody alienId="170" accordionId="tide">
            <p>
              Tide's ability, as printed, lets opposing players discard cards <em>of their choice</em> when Tide loses an encounter. This has been noted to help opposing players more often them harm them, at least when Tide has only a few tokens. A common recommendation is to change this so opposing players discard cards <em>at random</em>.
              {/* <br/><br/>
              The Praw also suggests replace the <strong>Game Setup</strong> text on Tide with the sentence "Whenever there are no tokens on this sheet, place two onto it.". This follows the same convention as <Link to="/Aliens/112">Multitude</Link>, allows Tide to be added mid-game and prevents Tide from having zero tokens due to <Link to="/Aliens/122">Pack Rat</Link>. */}
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="vox">
            Vox - Cosmic Storm
          </AccordionHeader>
          <AccordionAlienBody alienId="182" accordionId="vox">
            <p>Vox has been noted as a considerably <em>weak</em> alien. Out of the 37 attack cards in the deck, 25 are affected by Vox's power with anywhere between +1 and +11 to their side in the encounter, averaging around a +4.76. This is okay, better than the +4 <Link to="/Aliens/78">Human</Link> adds, but typically an alien that <em>just</em> adds to their side's total either has some other benefit (<Link to="/Aliens/78">Human</Link> can insta-win with a zap, <Link to="/Aliens/135">Porcupine</Link> can get rid of trash cards) or yeilds massive gains (See <Link to="/Aliens/186">Warpish</Link> and <Link to="/Aliens/179">Virus</Link>). Vox does neither, which makes it feel lackluster given these aliens. A popular buff, suggested by Just a Bill aka the Cosmodex's creator, is to let the Vox <strong><em>use</em></strong> their power to increase the value of one reinforcement card to a +11, insetad of one attack card. This gives Vox a much needed boost and makes it one of a few unique aliens that interact with reinforcement cards.<br/><br/>
            Another popular change is to let Vox work as a defensive ally as well as a main player and offensive ally. Why it only works as an offensive ally as printed is perculiar and, for many, seemingly random. This buff makes it work more intuitively and a powerful ally.
            <br/><br/>
            The Vox super flare is also quite weak, simply letting Vox draw 11 cards instead of 8 when drawing a new hand. Ironically the wild flare, which lets an ally add 11 to an encounter instead of the number of their ships, is a stronger effect. The Praw recommends a house rule to treat the printed super flare as the wild flare, and to introduce a new super flare effect that lets Vox use their power on multiple attack and/or reinforcement cards in a single encounter. Alternatively, you could choose to swap the wild and super effects entirely.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
      </UncontrolledAccordion>
    </Layout>
  );
}