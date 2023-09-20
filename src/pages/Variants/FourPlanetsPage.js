import Layout from '../../components/Layout'

export default function FourPlanetsPage() {
  return (
    <Layout title="Four Planets">
      <h1 className='mb-4'>Four Planets</h1>
      <p className="text-light">Four Planets is an official variant introduced in the base game to shorten the length of the game.</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Rules</h2>
      <p className="text-light">These are copied from the Base Game rules.</p>
      <h3>Gameplay</h3>
      <ul>
        <li className="text-light">Players each have four planets instead of five.</li>
        <li className="text-light">Players start the game with 16 ships instead of 20, placing four ships on each planet.</li>
        <li className="text-light">The winner is the first player to establish four foreign colonies instead of five.</li>
        <li className="text-light">Players lose their alien power when having fewer than two home colonies instead of three.</li>
      </ul>
    </Layout>
  );
}