import { Container } from 'reactstrap';
import Layout from '../components/Layout'

export default function ForeignAidPage() {
  return (
    <Layout>
      <h1 className='mb-4'>Foreign Aid</h1>
      <p className="text-light">Foreign Aid is an official variant introduced in Cosmic Eons. When accepting ally invitations, a player may choose to provide foreign aid by showing the inviting player a card from their hand. If accepted, the main player gains the card and the potential ally joins as normal. If rejected, the invited player keeps the card and cannot join as an ally</p>
      <hr class="border border-light border-2 opacity-100 my-4" />
      <h2>Rules</h2>
      <p className="text-light">These are copied from the Cosmic Odyssey campaign guide. Note that the rules for this variant have changed significantly from Cosmic Eons.</p>
      <h3>Gameplay</h3>
      <ul>
        <li className="text-light">When a player is invited to be an ally, that player may choose to send foreign aid rather than committing ships normally.</li>
        <li className="text-light">The potential ally offers the inviting main player a card from their hand. If the main player accepts the card, the ally may send <strong>up to one ship</strong> into the encounter. If the card is rejected, the player may not be an ally for either side.</li>
        <li className="text-light">If playing with hidden alliances, the foreign aid is offered after alliance dials have been revealed. This gives players the chance to see which sides other players have joined.</li>
      </ul>
    </Layout>
  );
}