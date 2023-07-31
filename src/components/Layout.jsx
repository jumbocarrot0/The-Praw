import { Helmet } from "react-helmet";

import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { Container } from "reactstrap";
import ScrollIntoView from "./ScrollIntoView";

import { Alert } from 'reactstrap'

export default function Layout(props) {
    return (
        <div className="App">
            <Helmet>
                <title>The Praw {props.title ? "- " + props.title : ""}</title>
            </Helmet>
            <ScrollIntoView>
                <Header />
                <main>
                    <Container>
                        {/* <Alert color="light">
                            <p className="d-inline">This site is moving! </p><a
                                className="alert-link"
                                href="https://the-praw.vercel.app/"
                                rel="noreferrer"
                                target="_external"
                            >Click here to access the new site!
                            </a>
                        </Alert> */}
                        <Breadcrumbs />
                        {props.children}
                    </Container>
                </main>
                <Footer />
            </ScrollIntoView>
        </div>
    );
}
