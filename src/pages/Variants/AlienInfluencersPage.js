export default function AlienInfluencersPage() {
  return (
    <div>
      <h1 className='mb-4'>Alien Influencers</h1>
      <p className="text-light">Alien Influencers is a fan variant that works very similarly to Evolutions, but with alien powers.</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Rules</h2>
      <h3>Setup</h3>
      <ul>
        <li className="text-light">Draw and place two alien sheets face up on the play area as ambassadors. If they have Game Setup text or are otherwise not allowed in the game, discard them and draw again.</li>
      </ul>
      <h3>Gameplay</h3>
      <ul>
        <li className="text-light">During each regroup phase, starting with the offense and going clockwise, each player may place one of their ships from any of their colonies onto an ambassador, or move one of their ships from one ambassador to another.</li>
        <li className="text-light">The player with the most ships (no ties) on an ambassador has the use of its alien power in addition to their power(s).</li>
        <li className="text-light">When a player sends ships during an encounter, they can take ships from ambassadors. After the encounter, if the player needs to return those ships, they cannot place them back on ambassadors; they must place those ships on any of their colonies instead.</li>
      </ul>
    </div>
  );
}