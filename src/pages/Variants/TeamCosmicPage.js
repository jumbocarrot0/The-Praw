import Layout from '../../components/Layout'

export default function TechListPage() {
  return (
    <Layout title="Team Cosmic">
      <h1 className='mb-4'>Team Cosmic</h1>
      <p className="text-light">Team Cosmic is an official variant introduced in Cosmic Alliance. The variant has no additional components, but is designed for higher player counts. Cosmic Odyssey makes this even more explicit, with the age card corresponding to this variant only being usable with 5 or more players.
      </p>
      <hr className="border border-light border-2 opacity-100 mb-5" />
      <h2>Rules</h2>
      <p className="text-light">These are copied from the Cosmic Odyssey rules</p>
      <h3>Setup</h3>
      <ol>
        <li className='text-light'>Shuffle together one destiny card of each player color.</li>
        <li className='text-light'>Reveal two cards at a time with only one card remaining if there is an odd number of players. Each pair represents a team of players who need to win the game together. If there is a single card remaining, that player is known as the <b>odd player</b>. Take the destiny cards used to determine teams and shuffle them into the destiny deck.</li>
        <li className='text-light'>After forming teams, partners sit across from each other at the table. If there is an odd player in the game, place an unused planet across the table from them.</li>
      </ol>
      <h3>Gameplay</h3>
      <ul>
        <li className="text-light">A player cannot have an encounter against their partner. During the destiny phase, if a player draws a destiny card with their partner's color, the player may either attack a foreign colony in their partner's home system (similar to if the player drew their own color) or draw again.</li>
        <li className="text-light">The main players in each encounter always automatically invite their partners as allies, but their partner does not need to accept. In this situation, a player cannot ally against their partner. However, in an encounter between other players, partners can ally with opposing sides.</li>
        <li className="text-light">If a player gains a colony in their partner’s system, it is treated as a home colony for that player, not a foreign colony.</li>
        <li className="text-light">To win the game, each player on a team must simultaneously be eligible to win the game by either having enough foreign colonies or completing an alternative win condition. If multiple teams win at the same time, it is a shared win. A player can have more than five colonies.</li>
        <li className="text-light">Each time a player gains a foreign colony, they may give their partner that foreign colony instead. The player returns their ships to their other colonies and their partner places an equal number of ships on the planet instead.</li>
        <li className="text-light">Although players still cannot show other players cards from their hands, they may talk openly - so that all players can hear - about their strategy and even name specific cards.</li>
        <li className="text-light">Since the odd player does not have a partner, the odd player only needs to complete a win condition by themselves to win. Also, when the turn order arrives at the unused planet across from the odd player, they receive a full turn. Afterwards, turn order continues from the unused planet.</li>
      </ul>
    </Layout>
  );
}