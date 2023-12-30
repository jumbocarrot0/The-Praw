export default function RewardsDeckPage() {
  return (
    <div>
      <h1 className='mb-4'>Rewards Deck</h1>
      <p className="text-light">The rewards deck is an official variant introduced in Cosmic Incursion. The deck is a purple-backed deck of cards that can only be drawn from when players gain rewards.
        <br />
        Cosmic Incursion includes 32 reward cards, which introduced kickers and rifts. Cosmic Dominion introduced an additional 32 reward cards, introducing intimidate and retreat cards. Cosmic Odyssey included 23 regular reward cards, and 9 ultra-reward cards, introducing Safeguards.</p>
      <h2>Trivia</h2>
      <ul>
        <li className="text-light">The Rewards Deck was originally a fan-made variant by Jack Reda to incentivise defensive alliances and to not clutter the main deck.</li>
      </ul>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Rules</h2>
      <p className="text-light">These are copied from the Cosmic Odyssey campaign guide</p>
      <h3>Setup</h3>
      <ul>
        <li className="text-light">Shuffle the reward deck and place it in the common play area.</li>
      </ul>
      <h3>Gameplay</h3>
      <ul>
        <li className="text-light">When a player draws cards as defender rewards, they may draw some or all of those cards from the reward deck.</li>
        <li className="text-light">When a reward card is discarded, it is discarded to the reward deck discard pile. Any abilities that affect the discard pile do not affect this discard pile.</li>
        <li className="text-light">If the reward deck is empty, shuffle its discard pile to make a new reward deck. If the reward deck discard pile is also empty, then players cannot draw reward cards.</li>
      </ul>
      <h3>Ultra Rewards</h3>
      <ul>
        <li className="text-light">This sub-variant, introduced in Cosmic Odyssey, adds a few even-stronger reward cards to the reward deck that have slightly different rules.</li>
        <li className="text-light">During setup, shuffle the ultra reward deck into the reward deck. Continue to shuffle until a normal reward card is on top.</li>
        <li className="text-light">While a player is gaining rewards and draws cards from the reward deck, if they would draw two ultra reward cards, instead of drawing the second ultra reward card they must gain the remaining rewards either in the form of drawing cards from the cosmic deck or freeing ships from the warp.</li>
        <ul>
          <li className="text-light">If players find the above rule too ambiguous, The Praw recommends the following altnerative rule: If a player has already drawn an ultra reward from the rewards deck in this encounter (not from another source like another player's hand), they may not draw another from the rewards deck.</li>
        </ul>
      </ul>
    </div>
  );
}