export default function FreewheelingPage() {
  return (
    <div>
      <h1 className='mb-4'>Common Rewards</h1>
      <p className="text-light">Common Rewards is an official variant introduced in Cosmic Incursion that adds reward cards to the cosmic deck.</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Rules</h2>
      {/* <p className="text-light">These are copied from the Base Game rules.</p> */}
      <h3>Setup</h3>
      <ul>
        <li className="text-light">Shuffle the rewards deck in the cosmic deck.</li>
      </ul>
      <h3>Gameplay</h3>
      <ul>
        <li className="text-light">Ultra Reward cards have no limit when drawing from the cosmic deck (or any deck outside of the reward deck).</li>
      </ul>
    </div>
  );
}