import Layout from '../components/Layout'
import { Alert } from 'reactstrap'

export default function Home() {
  return (
    <Layout>
      <br/>
      <br/>
      <br/>
      <h1>We've moved!</h1>
      <Alert color="light">
        <p className="d-inline"></p><a
          className="alert-link"
          href="https://the-praw.vercel.app/"
          rel="noreferrer"
          target="_external"
        >Click here to access the new site!
        </a>
      </Alert>
    </Layout>
  );
}