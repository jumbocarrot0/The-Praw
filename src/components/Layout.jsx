import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { Container } from "reactstrap";
import ScrollIntoView from "./ScrollIntoView";

export default function Layout(props) {
    return (
        <div className="App">
            <HelmetProvider>
                <Helmet>
                    <title>The Praw {props.title ? "- " + props.title : ""}</title>
                </Helmet>
                <ScrollIntoView>
                    <Header />
                    <main>
                        <Container>
                            <Breadcrumbs />
                            {props.children}
                        </Container>
                    </main>
                    <Footer />
                </ScrollIntoView>
            </HelmetProvider>
        </div>
    );
}
