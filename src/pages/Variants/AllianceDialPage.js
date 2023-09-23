import { Link } from 'react-router-dom';
import Layout from '../../components/Layout'

export default function AllianceDialPage() {
  return (
    <div>
      <h1 className='mb-4'>Hidden Alliances</h1>
      <p className="text-light">Hidden Alliances is an official variant introduced in Cosmic Eons. When players are joining as allies, each non main player is given a dial to secretly, and simultaneously, record who they're joining and with how many ships. All players reveal this simultaneously.</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Online Tool</h2>
      <p className="text-light">The Praw has an online tool that lets players use an alliance dial on their phone. This is useful if you do not own Cosmic Eons or do not like the small implementation of the dials.</p>
      <Link className="fs-3" to="/DigitalDial">Access the digital dial tool here</Link>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Rules</h2>
      <p className="text-light">These are copied from the Cosmic Eons rules</p>
      <h3>Gameplay</h3>
      <ul>
        <li className="text-light">During each encounter, after both main players have invited allies, each player who is eligible to become an ally takes an alliance dial and rotates it to indicate both the side that they are joining and the number of ships they are committing, as follows:</li>
        <ul>
          <li className="text-light">The number of dots in the window on the hyperspace gate end of the dial indicates the number of ships a player is committing to the offense.</li>
          <li className="text-light">The number of dots in the window on the planet end of the dial indicates the number of ships a player is committing to the defense.</li>
          <li className="text-light">A dash (-) in both windows indicates that a player is not committing ships to either side.</li>
          <li className="text-light">A star is used to show special cases, as presented on individual alien sheets or cards (e.g.: using the Plasma Thrusters tech card).</li>
          <li className="text-light">The rectangular card icon on the dial is used in the <Link to="/Variants/ForeignAid">Foreign Aid</Link> variant.</li>
        </ul>
        <li className="text-light">Each player who is eligible to ally must rotate their dial to one of the positions listed above, even if they do not intend to join the encounter. This keeps decisions among all players secret. Players are allowed to make claims out loud about the positions of their dials, whether true or not.</li>
        <li className="text-light">After selecting positions on their dials, players place their dials facedown in front of them. When all players have made their choice, all dials are revealed simultaneously. Those who have chosen to ally send their ships to the encounter according to the position of their dial.</li>
        <li className="text-light">In special circumstances where the alliance dial cannot show enough information to indicate a player's intentions (e.g., when using the Yin- Yang alien in Cosmic Dominion), the player dials the star into an appropriate window. After all of the dials are facedown in front of alien sheets, but before they are revealed, the player with such a special circumstance announces their choice out loud.</li>
      </ul>
    </div>
  );
}