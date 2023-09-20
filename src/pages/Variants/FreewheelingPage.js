import Layout from '../../components/Layout'

export default function FreewheelingPage() {
  return (
    <Layout title="Freewheeling Flares">
      <h1 className='mb-4'>Freewheeling Flares</h1>
      <p className="text-light">Freewheeling Flares is an official variant introduced in the base game, although its mention was removed from the 42nd anniversary edition. (Likely because the 42nd anniversary edition reframed flares to be optional.)</p>
      <hr className="border border-light border-2 opacity-100 my-4" />
      <h2>Rules</h2>
      {/* <p className="text-light">These are copied from the Base Game rules.</p> */}
      <h3>Gameplay</h3>
      <ul>
        <li className="text-light">Players may use as many flares as they wish during each encounter.</li>
        <li className="text-light">Each flare may still only be used once per encounter.</li>
      </ul>
    </Layout>
  );
}