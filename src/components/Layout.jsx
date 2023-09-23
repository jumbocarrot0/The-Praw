import { Outlet, useMatches } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { Container } from "reactstrap";
import ScrollIntoView from "./ScrollIntoView";

export default function Layout(props) {

    const matches = useMatches();
    const match = matches.filter((match) => Boolean(match.handle?.breadcrumb)).at(-1)
    const title = match.handle.breadcrumb(match.data)

    return (
        <div className="App">
            <HelmetProvider>
                <Helmet>
                    <title>The Praw {title ? `- ${title}` : ""}</title>
                </Helmet>
                <ScrollIntoView>
                    <Header />
                    <main>
                        <Container className={props.className}>
                            <Breadcrumbs />
                            <Outlet/>
                            {/* {props.children} */}
                        </Container>
                    </main>
                    <Footer />
                </ScrollIntoView>
            </HelmetProvider>
        </div>
    );
}
