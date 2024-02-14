import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'

export default function ForeignAidPage() {
  return (
    <div>
      <h1 className='mb-4'>Foreign Aid</h1>
      <p className="text-light">Foreign Aid is an official variant introduced in Cosmic Eons. When accepting ally invitations, a player may choose to provide foreign aid by showing the inviting player a card from their hand. If accepted, the main player gains the card and the potential ally joins as normal. If rejected, the invited player keeps the card and cannot join as an ally</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Rules</h2>
      <p className="text-light">There are two sets of rules for Foreign aid, one from Cosmic Eons and another from Cosmic Odyssey, with the former designed to work with the hidden alliance variant. Depite this, both are significantly different from one another, so players are encouraged to use whichever mehtod they prefer.</p>
      <UncontrolledAccordion defaultOpen={[]}>
        <AccordionItem>
          <AccordionHeader targetId="1">Cosmic Eons Rules</AccordionHeader>
          <AccordionBody accordionId="1">
            <h3>Gameplay</h3>
              <p className="text-light"><strong>Important:</strong> These rules assume you are using the hidden alliance dials from Cosmic Eons.</p>
            <ul>
              <li className="text-light">Any non-main player, invited or not, may position their dial to show the miniature card for either the offense or the defense.</li>
              <li className="text-light">When the dials are revealed, each player who chose to send foreign aid secretly offers one card from their hand to the chosen main player. The main players review their foreign aid offers and must accept or reject each one.</li>
              <ul>
              <li className="text-light">If a card is rejected, it is returned to the offering player.</li>
              <li className="text-light">If a card is accepted, the offering player immediately gains one reward and the main player may also invite the offering player to send a specified number of ships (subject to all applicable limits) to become his or her ally.</li>
              </ul>
            </ul>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Cosmic Odyssey Rules</AccordionHeader>
          <AccordionBody accordionId="2">
            <h3>Gameplay</h3>
            <ul>
              <li className="text-light">When a player is invited to be an ally, that player may choose to send foreign aid rather than committing ships normally.</li>
              <li className="text-light">The potential ally offers the inviting main player a card from their hand. If the main player accepts the card, the ally may send <strong>up to one ship</strong> into the encounter. If the card is rejected, the player may not be an ally for either side.</li>
              <li className="text-light">If playing with hidden alliances, players offer foreign aid by first turning the dial to the foreign aid icon (it looks like a card). Then, after alliance dials have been revealed, each player who offered foreign aid does so now. This gives players the chance to see which sides other players have joined before offering foreign aid.</li>
            </ul>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
      
    </div>
  );
}