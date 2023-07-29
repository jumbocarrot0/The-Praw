import Layout from '../components/Layout'
import Searchbar from '../components/Searchbar'


export default function Home() {
  return (
    <Layout>
      <section className="hero text-center">
        <h1 className="hero__title">The Praw</h1>
        <p className="hero__subtitle">A Fan-Made Website for <a href="https://futurepastimes.com/cosmic-encounter-board-game">Cosmic Encounter</a></p>
        <Searchbar/>
      </section>
    </Layout>
  );
}