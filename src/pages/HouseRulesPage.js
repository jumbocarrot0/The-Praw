import Layout from '../components/Layout'
import {
  Button,
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'
import { Link } from "react-router-dom"

function AccordionAlienBody(props) {
  return (<AccordionBody accordionId={props.accordionId}>
    <Link to={`/Aliens/${props.alienId}`}>
      <Button color="primary" className='mb-3'>
        Go to Alien Page
      </Button>
    </Link>
    <img alt={props.name + " Thumbnail"}
      className='float-end ms-5 mb-5'
      src={require(`../images/alien icons/avatar_${props.name.replace(' (AT)', '_AT').replace('The ', '')}.png`)}
    />
    {props.children}
  </AccordionBody>)
}


export default function HouseRulesPage() {
  return (
    <div>
      <h1 className='mb-4'>House Rules</h1>
      <p className="text-light">Cosmic Encounter has a lot of components, including aliens and various cards for its many variants. Throughout their release, the playerbase has noted that some of these components have issues with them that render them unfun. This may be due to a rules issue, which this site corrects on each item's page, but sometimes its due to a more opinionated stance on whether an alien or other component is too weak or too obtrusively strong.
        <br /><br />
        This page is dedicated to listing some common, more opinionated changes, to these components that don't really belong as a proper 'revision' to that component.</p>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <h2>Rules Changes</h2>
      <UncontrolledAccordion defaultOpen={[]} stayOpen={true} className='mb-5'>
        <AccordionItem>
          <AccordionHeader targetId="alienPlayerCounts">
            Alien Selection and Player Counts
          </AccordionHeader>
          <AccordionBody accordionId="alienPlayerCounts">
            <p>
              Many players have noted that on higher player counts (6, 7, 8+ players) some aliens become much weaker. In particular, aliens that work only as the offense or only as a main player. These aliens can feel underwhelimg at these counts or, even worse, never get used. The simplest solution is to remove these aliens from your rotation at higher player counts. A more convoluted solution would be to let these aliens use their powers when they are not a main player in some way, but this would need to be individualised for each alien.
              <br /><br />
              Likewise, aliens that only work as an ally may be similarly unfun at lower player counts (3 players, maybe 4 players) and you may wish to remove these as well.
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="alliancePhase">
            Alliance Phase
          </AccordionHeader>
          <AccordionBody accordionId="alliancePhase">
            <p>
              The official rules in the alliance phase dictate a precise order of event: Offense invites, then defense invites, then potential allies accept starting to the left of the offense and going clockwise. Some groups find this slows the game down too much, and may instead choose to forgo some parts of this. The Praw still recommends having both main players invite allies first before anyone joins, otherwise one may be unfairly piled on before they even have the chance to invite anyone.
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="objectives">
            Array Objectives
          </AccordionHeader>
          <AccordionBody accordionId="objectives">
            <p>
              The Praw recommends to use the additional scoring conditions on the 'Forgotten Age of Eons' when playing with array objectives outside of a campaign, i.e. 1 point per foreign colony and 6 points for achieving a victory condition. This makes winning encounters desirable and does not make the game wholly rely on the objectives.
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="technologies">
            Base Set Technologies
          </AccordionHeader>
          <AccordionBody accordionId="technologies">
            <p>
              Many players have noted that the technologies in the base game are quite underwhelming. This is especially prevalent when mising in techs from Cosmic Odyssey, which have a significant increase in power comparatively. A suggested 'bandaid fix' is to treat all techs from the base game to start with the phrase "When completed, draw another tech" to bring it inline with those from Odyssey. A more ideal solution would be a thorough remake of each original tech, but this goes beyond the scope of this page.
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="duplicateHazards">
            Duplicate Hazards
          </AccordionHeader>
          <AccordionBody accordionId="duplicateHazards">
            <p>
              Cosmic Conflict's 28-card hazard deck only has 17 unique hazards in it. The other 11 are duplicate hazards{/* (2 Energy Fields, 3 It's Full of Stars, 2 Meteor Storms, 2 Mirror Universes, 2 Odd Way to Win a Wars, 3 Reverse Rewards, 2 Sargasso Webs, and 3 Temporal Anomalies) */}. Some find that this reduces the variaty of the hazard deck, especially with even more hazards added in Cosmic Odyssey. A common suggestion is to simply remove these duplicate hazards from the deck. The Praw further challenges readers to see if any of these duplicate hazards can be better served as a semi-permanet hazard.
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="permanentHazards">
            'Remains in Play' Hazards
          </AccordionHeader>
          <AccordionBody accordionId="permanentHazards">
            <p>
              Cosmic Odyssey introduced 'Semi-Permanent hazards', which remain in play until another such hazard is drawn. Cosmic Conflict had a similar system with a trio of Hazards: <Link to="/Variants/Hazards/6">The Entropy Beast</Link>, <Link to="/Variants/Hazards/16">Witness</Link>, and <Link to="/Variants/Hazards/2">Cosmic Guardian</Link>. Without Cosmic Odyssey, these would work identically to a semi-Permanent hazard. However, with Cosmic Odyssey, they present some very odd interactions. The official ruling is that whenever a hazard with a 'Semi-Permanent' or 'This Remains in Play' label is drawn, <em>all</em> in-play semi-Permanent hazards are removed. This is a bit unintutive, and a hassle to explain to people. The Praw recommends instead to simply treat the mentioned trio of hazards as Semi-Permanent, and ignore the interaction between Semi-Permanent and 'This Remains in Play' hazards for the case of <Link to="/Variants/Hazards/0">Alliance</Link>.
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="stationSetup">
            Space Station Setup
          </AccordionHeader>
          <AccordionBody accordionId="stationSetup">
            <p>
              Odyssey's campaign guide has each player draw 3 station cards - one of each type - and pick two to put in play. This setup can make the game too convoluted with so many effects in play, especially for newer players who are trying to remember the differences between the 3 types of space stations. The Praw recommends to have players pick only 1 of the 3 drawn stations, and further to have the station types drawn be random.
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="temporalAnomaly">
            Temporal Anomaly Hazard
          </AccordionHeader>
          <AccordionBody accordionId="temporalAnomaly">
            <p>
              Many players have voices a particular disdain for <Link to="/Variants/Hazards/15">Temporal Anomaly</Link>, which can cause a player to unfairly have far fewer turns than everyone else out of sheer luck. Its recommended to simply remove this card from your hazard deck if you feel like this will be an issue for your group.
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="ultraRewards">
            Ultra Rewards
          </AccordionHeader>
          <AccordionBody accordionId="ultraRewards">
            <p>
              The official rules for how many ultra rewards you can draw in an encounter is vague and finicky. It's along the lines of 'once per type of draw opportunity' in order to prevent cheese from Lux. Some find this too convoluted. The Praw recommends a simpler alternate rule: "You may only draw 1 ultra reward card from the reward deck per encounter."
            </p>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
      <h2>Alien Changes</h2>
      <UncontrolledAccordion defaultOpen={[]} stayOpen={true}>
        <AccordionItem>
          <AccordionHeader targetId="arcade">
            Arcade - Cosmic Storm
          </AccordionHeader>
          <AccordionAlienBody alienId="9" name="Arcade" accordionId="arcade">
            <p>
              As printed, Arcade is able to <em><strong>use</strong></em> their power whenever their side plays an attack card and their opponent plays a negotiate card. Typically this is fine as it results in a win, but in any scenario where Arcade's side loses in spite of playing an attack vs a negotiate (e.g. Pacifist, Human), it's counterintuitive that Arcade will pwn a ship and "dominate" even though they lost. The Praw recommends to change this so that Arcade needs to actually be winning in such a scenario in order for their power to be <em><strong>used</strong></em>.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="demonAT">
            Demon (AT) - Cosmic Odyssey
          </AccordionHeader>
          <AccordionAlienBody alienId="228" name="Demon (AT)" accordionId="demonAT">
            <p>
              Alternate Timeline Demon suffers at lower player counts. In a 4 player game they are only given one possible player that they can dominate, and in a 3 player game their power is nigh useless. The Praw recommends, at least at these low player counts, to let the Demon posses any involved ships that are not on the targetted planet.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="fido">
            Fido - Base Set
          </AccordionHeader>
          <AccordionAlienBody alienId="55" name="Fido" accordionId="fido">
            <p>Some players feel that instead of choosing to retrieve either a ship from the warp or draw a card, Fido should instead earn a reward instead. This makes the power a bit simpler while giving Fido access to the reward deck.</p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="gambler">
            Gambler - Base Set
          </AccordionHeader>
          <AccordionAlienBody alienId="62" name="Gambler" accordionId="gambler">
            <p>Gambler, as printed, cannot be used in the same game as <Link to="/Aliens/161">Sorcerer</Link>, since Gambler cannot bluff about a card they did not play. The official FAQ states that this restriction is, technically, optional as long as you don't mind Gambler having less power against Sorcerer.
              <br /><br />
              If, however, you would like this restriction to be removed, then a popular house rule is that if Sorcerer uses their power against Gambler, then Gambler will simply bluff about their <em>opponent's</em> encounter card, the one Gambler originally played.
              <br /><br />
              Although, even without any rules changes, Gambler's power isn't completely obsolete against Sorcerer. Since its ability is <em>optional</em>, it can choose to never bluff when Sorcerer swaps cards. Then then gives it an interesting advantage mind-games wise. Gambler knows that Sorcer is more likely to swap to prevent its power. So Gambler could play a bad card in case Sorcerer swaps, and if they don't swap, bluff that they played a good card. Or Gambler could play a good card in hopes Sorcerer doesn't swap for exactly the previous scenario, and catch them in a double bluff.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="healer">
            Healer - Base Set
          </AccordionHeader>
          <AccordionAlienBody alienId="75" name="Healer" accordionId="healer">
            <p>As printed, Healer is able to save ships sent to the warp <em>and</em> any ships removed from the game. The latter poses as a powerful counter to aliens like <Link to="/Aliens/181">Void</Link> and <Link to="/Aliens/145">Remote</Link>, which rely on removing ships from the game for their effect, and removes the fun out of other effects such as the <Link to="/Variants/Hazards/1">Black Hole</Link> hazard. As such, many players feel that Healer should <em>only</em> be able to affect ships sent to the warp.
              <br />
              <br />
              Moreover, Healer's healing is mandatory, players <em>must</em> retrieve their lost ships. This is also a powerful counter to aliens who rely on ships in the warp, most notably <Link to="/Aliens/98">Masochist</Link> but also aliens like <Link to="/Aliens/213">Lemming</Link>, <Link to="/Aliens/186">Warpish</Link>, <Link to="/Aliens/183">Voyager</Link>, etc.. It has been suggested that to alieviate this counter, that players healed by Healer do <em>not</em> have to retrieve their ships from the warp. To maintain the Healer's power, its recommended that Healer still receives their fee of 1 card from the deck regardless of if players retrieve their ship, but you may wish to experiment otherwise.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="masochist">
            Masochist - Base Set
          </AccordionHeader>
          <AccordionAlienBody alienId="98" name="Masochist" accordionId="masochist">
            <p>
              A popular recommendation is to add 'Do Not Use with <Link to="/Aliens/75">Healer</Link>' to Masochist's power since, as printed, Healer will just prevent Masochist from having any ships in the warp. This is not required if you house rule Healer's healing to be optional of course, but you may wish to impose this anyways since Healer will gain a lot of cards from attemtping to heal the Masochist.
              <br /><br />
              The <Link to="/Aliens/231">alternate timeline Masochist</Link> in Odyssey does not need such a fix.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="meek">
            The Meek - Cosmic Odyssey
          </AccordionHeader>
          <AccordionAlienBody alienId="220" name="The Meek" accordionId="meek">
            <p>
              The Meek, as printed, is a bit of a cumbersome alien to use. Using a colony marker in such an abnormal fashion, whilst an interesting concept, doesn't work for various practical and rules-breaking reasons. For one, its easy to nudge the colony markers and lose track of the Meek's true score. It also has poor interact with aliens like Plant, Reincarnator, etc.. <Link to="https://youtu.be/ahRh3CthMdg?t=1098">In his video covering Cosmic Odyssey aliens</Link>, designer Jack Reda mentioned that The Meek would've been clearer if it just gained and lost colonies explicitly, rather than fandangling around with the colony marker. The Praw supports this idea for an alternative Meek, as it maintains the core of the power whilst being much clearer.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="phantasm">
            Phantasm - Cosmic Storm
          </AccordionHeader>
          <AccordionAlienBody alienId="129" name="Phantasm" accordionId="phantasm">
            <p>
              Some suggest that Phantasm's power should be made optional in order to allow it to create deal situations naturally. Some further suggest that once Phantasm's power is <em><strong>used</strong></em> the card replacement should then be optional.
              <br /><br />
              Another suggestion, this one by designer Jack Reda, is to keep the power mandatory, but <em>only</em> when neither player has revealed a negotiate card.
              <br /><br />
              The Phantasm wild flare is also oddly strong, providing its holder an effect quite similar to Phantasm's power. The only nerf compared to Phantasm's power is that the flare's holder may only replace their own encounter card. However, compared to the Phantasm's power, the drawn encounter card may be discarded instead of replacing a card, and a drawn non-encounter card is added to the flare holder's hand. This is often seen as a stronger version of the Phantasm's power since its optional, and has a much higher chance of gaining it holder <em>something</em>. From experience, the player with the Phantasm's power may feel like they have the short end of the stick here. The Praw recommends to eliminate the stronger aspects of the Phantasm wild flare, so that a drawn non-encounter card to be simply discarded, much like with the Phantasm's power, and a drawn encounter card <em>must</em> replace the flare holder's encounter card. Its still quite useful even in this state, but it becomes a last-ditch hail mary play rather than something that's played every single opportunity.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="porcupine">
            Porcupine - Cosmic Storm
          </AccordionHeader>
          <AccordionAlienBody alienId="135" name="Porcupine" accordionId="porcupine">
            <p>
              Some players suggest that Porcupine should be allowed to <strong><em>use</em></strong> their power even when their side is not losing the encounter. This allows Porcupine to use their power to ditch undesirable cards, even if their side is already winning, or potentially to cause their side to lose when they would otherwise win.<br /><br />
              The Praw does highlight that letting Porcupine use their power when winning does make them a more unreliable ally, since they have the ability to throw the encounter, which may result in them being invited less.<br /><br />
              The Praw also recommends to treat Porcupine as a green alert alien, since its power is simple and can be grasped easily by new players. The only hitch is that a new player may overvalue certain cards, but The Praw believes that even beginners to the game can grasp the weakness of an attack 00 or a negotiate.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="remora">
            Remora - Base Set
          </AccordionHeader>
          <AccordionAlienBody alienId="144" name="Remora" accordionId="remora">
            <p>
              Some players feel that Remora's power is severely hindered when the Reward deck variant is used, since Remora cannot <em><strong>use</strong></em> their power when players draw from that deck. Some players recommend to let Remora draw from the rewards deck anyways. The Praw recommends a slightly different change that allows Remora to <strong><em>use</em></strong> its power whenever players draw cards from any deck into their hand, but that Remora only ever draws cards from the cosmic deck when <em><strong>using</strong></em> its power, regardless of the deck the original player drew from. This retains Remora's strength whenever the reward deck is played, without buffing it by giving it easy access to powerful reward cards.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="schizoidat">
            Schizoid (AT) - Cosmic Odyssey
          </AccordionHeader>
          <AccordionAlienBody alienId="235" name="Schizoid (AT)" accordionId="schizoidat">
            <p>
              As printed, the alternate timeline Schizoid replaces the normal victory condition with any one condition on their sheet, including any faceup conditions revealed as players win against Schizoid. Many feel this goes against the core idea of Schizoid, which should only have a secret condition. It also can lead to anti-climatic games, where a revealed condition may suddenly end the game. The Praw recommends to house rule this so that only the facedown condition replace the normal victory conditions, not least because designer Jack Reda has confirmed that this was the original intent.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="tide">
            Tide - Cosmic Storm
          </AccordionHeader>
          <AccordionAlienBody alienId="170" name="Tide" accordionId="tide">
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
          <AccordionAlienBody alienId="182" name="Vox" accordionId="vox">
            <p>Vox has been noted as a considerably <em>weak</em> alien. Out of the 37 attack cards in the deck, 25 are affected by Vox's power with anywhere between +1 and +11 to their side in the encounter, averaging around a +4.76. This is okay, better than the +4 <Link to="/Aliens/78">Human</Link> adds, but typically an alien that <em>just</em> adds to their side's total either has some other benefit (<Link to="/Aliens/78">Human</Link> can insta-win with a zap, <Link to="/Aliens/135">Porcupine</Link> can get rid of trash cards) or yeilds massive gains (See <Link to="/Aliens/186">Warpish</Link> and <Link to="/Aliens/179">Virus</Link>). Vox does neither, which makes it feel lackluster given these aliens. A popular buff, suggested by Just a Bill (the Cosmodex's creator), is to let the Vox <strong><em>use</em></strong> their power to increase the value of one reinforcement card to a +11, insetad of one attack card. This gives Vox a much needed boost and makes it one of a few unique aliens that interact with reinforcement cards.<br /><br />
              Another popular change is to let Vox work as a defensive ally as well as a main player and offensive ally. Why it only works as an offensive ally as printed is perculiar and, for many, seemingly random. This buff makes it work more intuitively and a powerful ally.
              <br /><br />
              The Vox super flare is also quite weak, simply letting Vox draw 11 cards instead of 8 when drawing a new hand. Ironically the wild flare, which lets an ally add 11 to an encounter instead of the number of their ships, is a stronger effect. The Praw recommends a house rule to treat the printed super flare as the wild flare, and to introduce a new super flare effect that lets Vox use their power on multiple attack and/or reinforcement cards in a single encounter. Alternatively, you could choose to swap the wild and super effects entirely.
            </p>
          </AccordionAlienBody>
        </AccordionItem>
      </UncontrolledAccordion>
    </div>
  );
}