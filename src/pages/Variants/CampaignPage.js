import {
  Table,
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge
} from 'reactstrap'
import Item from '../../components/Item'
import GridBrowser from "../../components/GridBrowser";

export default function CampaignPage() {

  const campaign_components = {
      "Ages": { name: "Ages", short: "", thumbnail: "variant icons/Age Icon.png" },
      "PrivilegeCards": { name: "Privilege Cards", short: "", thumbnail: "variant icons/Privilege Icon.png" },
      "Envoys": { name: "Envoys", short: "", thumbnail: "variant icons/Envoy Icon.png" },
      "MasterCards": { name: "Master Cards", short: "", thumbnail: "variant icons/Master Card Icon.png" },
      "WrenchCards": { name: "Wrench Cards", short: "", thumbnail: "variant icons/Wrench Icon.png" },
      "SelectionMethods": { name: "Alien Selection Methods", short: "", thumbnail: "" }
  }

  return (
    <div>
      <h1 className='mb-4'>Campaign Mode</h1>
      <p className="text-light">The Campaign variant is the box-featured variant of Cosmic Odyssey, designed to allow players to easily explore that expansion's 8+ variants.
        <br /><br />
        In this variant, players will play through four games of Cosmic. Throught the campaign players will add aliens to their coalitions, earn prizes for future games, endure through ages that introduce random variants, culminating in an epic and crazy finale.
        <br /><br />
        This page details the rules of a campaign, and also contains links for other campaign components, such as envoys, age cards, etc..
      </p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <p className="text-light">These are copied from the Cosmic Odyssey campaign guide, but formatted and edited for readability.</p>
            <h3>Setup</h3>
            <p className="text-light">Setup for a game in the campaign is similar to advanced setup for the base game with a few changes. Perform the following steps:</p>
            <ol>
              <li className="text-light"><strong>Choose Player Color:</strong> In the first game of the campaign, each player chooses a player color they will use for the remainder of the campaign.</li>
              <ul>
                <li className='text-light'><Badge color="primary">Not 1st game</Badge> In future games in this campaign, skip this step.</li>
              </ul>
              <li className="text-light"><strong>Prepare the Campaign Log:</strong> If it's the first game, take an unused campaign log and record each player's name in their chosen color.</li>
              <ul>
                <li className='text-light'>The rulebook says to fill in the coalition name after selecting aliens in the 2nd game (when it becomes a coalition) but you can do it whenever.</li>
                <li className='text-light'>Players will write down aliens in their coalition after selecting aliens each game.</li>
                <li className='text-light'>Each game's age is recorded after its determined.</li>
                <li className='text-light'>Player rankings are recorded at the end of each game.</li>
              </ul>
              <li className="text-light"><strong>Set Up Warp, Planets, Ships, and Colonies:</strong> Each player takes their planets and ships, places their planets in front of them and stacks four of their ships on each of their planets. Then, place the warp in the center of the play area. Finally, players place their colony markers at “0” on the colony track.</li>
              <li className="text-light"><strong>Prepare Decks:</strong> Take the three destiny cards that correspond to each player's color and shuffle them with the wild and special destiny cards to create the destiny deck.</li>
              <ul>
                <li className='text-light'>You'll also want to set aside the master card deck.</li>
                <li className='text-light'><Badge color="primary">Not 1st game</Badge> For all games except the first, also set aside the envoy and privilege card decks.</li>
                <li className='text-light'><Badge color="danger">Finale</Badge> In the finale, also set aside the wrench deck.</li>
              </ul>
              <li className="text-light"><strong>Choose First Player:</strong></li>
              <ul>
                <li className="text-light"><Badge color="success">1st game</Badge> For the first game, reveal cards from the destiny deck until a card matching the color of one of the players is revealed; that player is the first player. Then, shuffle the destiny deck.</li>
                <li className="text-light"><Badge color="primary">Not 1st game</Badge> For all future games, the player who ranked the lowest during the previous game becomes the first player.</li>
              </ul>
              <li className="text-light"><strong>Discover New Age:</strong></li>
              <ul>
                <li className='text-light'><Badge color="success">1st game</Badge> For the first game, draw and reveal the top card from the age deck, that is the age of the first game.</li>
                <li className='text-light'><Badge color="primary">Not 1st game</Badge> For all future games, the player who ranked the <em>highest</em> during the previous game draws two age cards and chooses one to reveal and become the age for this game. Shuffle the unchosen age back into the deck.</li>
                <ul>
                  <li className='text-light'><em>If playing with fewer than five players,</em> remove the Dignified Age of Alliances card from the age deck.</li>
                  <li className='text-light'>Each age will have a name, in the format of "THE ___ AGE OF ___", an alien selection method, a variant and scoring conditions..</li>
                  <li className='text-light'>For each game, record the name of the age at the top of the campaign log.</li>
                </ul>

              </ul>
              <li className="text-light"><strong>Resolve Selection Method:</strong> Find the corresponding rules for the alien selection method listed on the age card by turning to the page number in this guide listed at the bottom of the age card and follow the instructions.</li>
              <ul>
                <li className='text-light'>Each player records the alien they acquired in the campaign log, under Coalition Members.</li>
                <li className='text-light'>Aliens in any player's coalition will be removed from the unused alien deck for the rest of the campaign.</li>
              </ul>
              <li className="text-light"><strong>Select Alien:</strong></li>
              <ul>
                <li className='text-light'><Badge color="success">1st game</Badge> For the first game, each player automatically chooses the sole alien in their soon-to-be-coalition.</li>
                <li className='text-light'><Badge color="primary">Not 1st game</Badge> For all future games, starting with the highest-ranked player from the previous game and continuing in descending ranking order, each player selects aloud their alien from among their Coalition Members. If there are multiple players with the same rank, they select simultaneously.</li>
              </ul>
              <li className="text-light"><strong>Prepare the Variant(s):</strong> Find the corresponding rules for the variant listed on the age card located on the same page as the alien selection method and follow the instructions.</li>
              <ul>
                <li className="text-light">These rules typically alter setup by adding a new component, such as a deck of cards.</li>
                <li className="text-light"><Badge color="primary">Not 1st game</Badge> <strong>Additionally</strong>, for all games except the first, you will include the variant from the previous age as well.</li>
              </ul>
              <li className="text-light"><strong>Identify/Collect the Prize:</strong> For all games except the finale, find the master card in the master deck that shares its name with the age card. Read this card aloud and set it aside.</li>
              <ul>
                <li className="text-light">Master cards are awarded to the winning players at the end of the game, and its effect is used during the finale.</li>
                <li className="text-light"><Badge color="danger">Finale</Badge> <strong>However</strong>, for the finale, players will finally use their earned master cards. In the order that they were acquired, each master card that was claimed is read aloud. Each player that marked a “1” during that age resolves its effect starting with the first player and going clockwise. Master cards generally grant the players a unique benefit that reflects the age in which they dominated.</li>
                <li className="text-light"><Badge color="danger">Finale</Badge> After resolving the master cards, identify the player that marked a square around their score during the first game. That player draws two wrench cards from the wrench deck, chooses one to resolve, and shuffles the other into the deck. Then, they read the chosen card's text aloud and follow its instructions. Repeat this process for each of the other played games.</li>
              </ul>
              <li className="text-light"><strong>Prepare Cosmic Deck:</strong> Find each flare card that corresponds to the selected aliens from the flare deck. Add additional flare cards until the total number is 10 or twice the number of players, whichever is greater. Shuffle these flares with the encounter, reinforcement, and artifact cards to create the cosmic deck</li>
              <li className="text-light"><strong>Deal Starting Hands:</strong></li>
              <ul>
                <li className='text-light'><Badge color="success">1st game</Badge> For the first game, simply deal a starting hand of eight cosmic cards to each player.</li>
                <li className='text-light'><Badge color="primary">Not 1st game</Badge> For all future games, each player that did not win the previous game will receive a prized based on how well they did:</li>
              </ul>
              <Table bordered striped>
                <thead className='border-white'>
                  <tr>
                    <th>Player Ranking from Last Game</th>
                    <th>Prize</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      1
                    </th>
                    <td>
                      No immediate bonus (prize was the master card for the finale)
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      2
                    </th>
                    <td>
                      Draw 2 privilege cards, keep 1
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      3
                    </th>
                    <td>
                      Gain 1 random envoy
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      4
                    </th>
                    <td>
                      Draw 1 unused flare as part of your starting hand
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      5
                    </th>
                    <td>
                      Draw ultra reward card as part of your starting hand
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      6
                    </th>
                    <td>
                      Draw 2 reward cards as part of your starting hand
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      7
                    </th>
                    <td>
                      May discard any number of cards from your starting hand
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      8
                    </th>
                    <td>
                      May discard up to 3 cards from your starting hand.
                    </td>
                  </tr>
                </tbody>
              </Table>
            </ol>
            <h1 className='mb-4'>Gameplay</h1>
            <ul>
              <li className="text-light">After setup, the game proceeds like any other game of Cosmic Encounter. The game still ends like a normal game when either a player establishes their fifth foreign colony or achieves an alternative win condition. That player is the winner of the game. Then, the score is determined.</li>
              <li className="text-light">Some cards other than age cards may introduce additional variants. These cards will include a page number reference of where the rules for that variant are located. For example, if a card adds the Reward Deck variant, it includes (🕮10) to guide players to turn to page 10 in this guide.</li>
              <li className="text-light">At the end of each game except the finale, every player is given a ranking based on 1) if they won the game and 2) their score during that game based upon the current age.</li>
              <ul>
                <li className='text-light'>Write each player's rank down on the campaign log. This is important to determine prizes in future games.</li>
                <li className='text-light'>The player(s) that won the game (via the standard method or otherwise) are given a rank of "1", regardless of their score.</li>
                <ul>
                  <li className='text-light'>If a player wins a game using an alternative win condition, instead of determining their score, they are treated as having scored one point more than the player who has the true highest score.</li>
                </ul>
                <li className='text-light'>Among the non-winning players, the one with the highest-score writes a "2" in the campaign log, then the one with the next highest score writes a “3,” and so on.</li>
                <li className='text-light'>Each player earns a score based on the current age's scoring criteria. This score is used to determine the ranking of each player. The age card being used identifies which parts of the game award players with points.</li>
                <li className='text-light'>If any players have the exact same score, starting with the offense and going counter-clockwise among the tied players, the player that was closest to the offense is ranked higher.</li>
                <li className='text-light'>The lowest-ranked player draws a square around their rank that game to indicate that they have "earned" a wrench card in the finale, and that they will go first during the next game.</li>
                <li className='text-light'>The highest-ranked player draws a circle around their rank that game to indicate that they will select the age card next game. If multiple players had the "1" rank, ties are broken based upon those players' scores.</li>
                <ul>
                  <li className='text-light'><strong>The Praw house rule:</strong> Players who earned a "1" rank but did not draw a circle should draw a star to indicate that they still earn a master card in the finale.</li>
                  <li className='text-light'><strong>Rules oddity:</strong> The circle indicated <em>only</em> who selects next game's age, it does not influence master cards.</li>
                </ul>
              </ul>
              <li className='text-light'>After each player has recorded their ranking, they clean up the game to prepare for the next game of the campaign. To clean up, the players return each component back to its corresponding deck or pile, with the following exceptions:</li>
              <ul>
                <li className='text-light'><strong>Alien Sheets:</strong> Each player keeps the alien sheets that are part of their coalition.</li>
                <li className='text-light'><strong>Age Cards:</strong> Each of the cards that was used during setup is set aside..</li>
              </ul>
              <li className='text-light'>Players continue to play games until the designated finale. For the standard campaign, the finale is the fourth game.</li>
              <li className='text-light'>The winner of the finale also wins the campaign! They become the Celebrated Cosmos Champion—at least for now. If multiple players win the finale, they become the Cuestionably Contested Cosmos Champions and share the win! (Perhaps another campaign is needed to determine a Cingularly Celebrated Cosmos Champion.)</li>
            </ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h1 className='mb-4'>Campaign Components</h1>
            <GridBrowser cardTemplate={Item}
                noSort={true}
                url="/Variants/Campaign"
                border={() => "pink"}
                type={() => { return null }}
                content={campaign_components}
                width={4}
            />
    </div>
  );
}