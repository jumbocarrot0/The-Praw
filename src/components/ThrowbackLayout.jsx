import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from "react-router-dom";
import {
    Row, Col
} from 'reactstrap';

import Header from "./ThrowbackHeader";
import ScrollToTop from "./ScrollToTop";

export default function Layout(props) {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Display Any Alien</title>
                <body className='throwback' />
            </Helmet>
            <ScrollToTop />
            <Row>
                <Col md={3}>
                </Col>
                <Col md={6}>
                    <Header className="my-3" />
                    <main>
                        {props.children}
                        <div className="d-flex justify-content-center my-3">
                            <Link to="/Aliens">
                                <img src={require('../images/goback.gif')} alt="Go Back" />
                            </Link>
                        </div>
                    </main>
                </Col>
                <Col md={3}>
                </Col>
            </Row>
            {/* <Footer /> */}
        </HelmetProvider>
    );
}
