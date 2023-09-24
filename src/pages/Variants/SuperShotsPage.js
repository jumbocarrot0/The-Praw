export default function SuperShotsPage() {
  return (
    <div>
      <h1 className='mb-4'>Super Shots</h1>
      <p className="text-light">Super Shots is a fan-made variant. In it, super flares are not shuffled into the deck and instead are given to each player for limited use.</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Rules</h2>
      {/* <p className="text-light">These are copied from the Base Game rules.</p> */}
      <h3>Setup</h3>
      <ul>
        <li className="text-light">Each player sets aside the flare(s) that matches their alien power(s). Do not shuffle these flares into the deck.</li>
        <li className="text-light">Each player places 3 tokens (or 2 in a 4-planet game) on each of their super flare(s) as a 'super-shot' flare.</li>
      </ul>
      <h3>Gameplay</h3>
      <ul>
        <li className="text-light">Players may play their super-shot flare at the appropriate time by discarding a token from it.</li>
        <li className="text-light">If a super-shot flare has no tokens on it, it may not be played.</li>
        <li className="text-light">When a super-shot flare is played, it may be card zapped like a normal flare card. If it is, the effect is canceled, but neither the flare nor the token used to activate it are discarded.</li>
        <li className="text-light">If a player loses their alien power, you keep the use of the super shot flare, but now you may use the wild ability (if it has tokens on it).</li>
        <li className="text-light">Likewise, if a player has a super-shot that does not match their alien power, they may use its wild ability (if it has tokens on it).</li>
        <li className="text-light">If a super-shot flare is discarded after use, it and all the tokens on it are discarded.</li>
        <li className="text-light">If a super-shot flare is given to another player after use, it is given to that player, but that player does not add it to their hand. Instead, it is kept as another super-shot flare they may use.</li>
      </ul>
      <h3>Special Rules and Clarifications</h3>
      <ul>
        <li className="text-light">When playing with Reactor in this variant, do the following:</li>
        <ul>
          <li className="text-light">Follow Reactor's <strong>Game Setup</strong> text, other players do not start with their super-shot flare. (Reactor takes their super-shot flare as normal.)</li>
          <li className="text-light">In addition to Reactor's <strong>Game Setup</strong>, place 3 tokens (or 2 in a four-planet game) on each of the flares on Reactor's sheet.</li>
          <li className="text-light">When any player is given a flare with Reactor's power (including Reactor), the flare is given as a super-shot flare instead of being added to their hand.</li>
          <li className="text-light">If a player has Reactor's flare and plays their super-shot flare, they give Reactor their super flare.</li>
        </ul>
        <li className="text-light">When playing with Inferno in this variant, do the following:</li>
        <ul>
          <li className="text-light">The 5 duplicate Inferno flares are shuffled into the deck as usual.</li>
          <li className="text-light">When using the Inferno super through the super-shot flare, the flare is added to the player's hand and any tokens on it are discarded.</li>
        </ul>
      </ul>
    </div>
  );
}