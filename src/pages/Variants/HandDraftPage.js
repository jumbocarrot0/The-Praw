import Layout from '../../components/Layout'

export default function HandDraftPage() {
  return (
    <Layout title="Hand Draft">
      <h1 className='mb-4'>Hand Draft</h1>
      <p className="text-light">Hand Draft is a fan-made variant that changes the way starting hands are dealt.</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Rules</h2>
      {/* <p className="text-light">These are copied from the Base Game rules.</p> */}
      <h3>Setup</h3>
      <ol>
        <li className="text-light">Each player draws 8 cards as normal, but this is not their starting hand.</li>
        <li className="text-light">Each player chooses one card in their hand to set aside and then gives the remaining to the player to their left.</li>
        <li className="text-light">Once each player has 8 cards set aside; the draft has finished, and the set-aside cards form each player's starting hand. Any leftover cards that were dealt but not drafted are discarded.</li>
        <li className="text-light">If any players draw additional cards <strong>after</strong> they draw their starting hand, they do so now.</li>
      </ol>
      <h3>Special Rules and FAQ</h3>
      <ul>
        <li className="text-light">When playing with Aristocrat in this variant, they perform their <strong>Game Setup</strong> before the draft and select their starting hand. They then do not participate in the draft.</li>
        <li className="text-light">If a player draws cards from another source such as the rewards deck, they draw those cards at the beginning of the draft. This means that their true starting hand will not have any extra cards, and they may not have all the cards from alternative sources.</li>
      </ul>
    </Layout>
  );
}