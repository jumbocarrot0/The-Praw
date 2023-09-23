import { useEffect } from 'react'
import { Outlet, useMatches, ScrollRestoration } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { Container } from "reactstrap";
import ScrollToTop from "./ScrollToTop";

export default function Layout(props) {

    const matches = useMatches();
    const match = matches.filter((match) => Boolean(match.handle?.breadcrumb)).at(-1)
    const title = match.handle.breadcrumb(match.data)
    
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [match]);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>The Praw {title ? `- ${title}` : ""}</title>
                </Helmet>
            </HelmetProvider>
            <div id="app" className="App">
                <Header />
                <main>
                    <ScrollToTop/>
                    <Container className={props.className}>
                        <Breadcrumbs />
                        <Outlet />
                        {/* {props.children} */}
                    </Container>
                </main>
                <Footer />
            </div>
        </>
    );
}
