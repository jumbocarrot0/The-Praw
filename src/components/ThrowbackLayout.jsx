import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
    Row, Col
} from 'reactstrap';

import Header from "./ThrowbackHeader";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import ScrollIntoView from "./ScrollIntoView";

export default function Layout(props) {
    return (
        <div className="App">
            <Helmet>
                <title>Display Any Alien</title>
                <body className='throwback' />
            </Helmet>
            <ScrollIntoView>
                <Row>
                    <Col md={3}>
                    </Col>
                    <Col md={6}>
                        <Header className="my-3" />
                        <main>
                            {props.children}
                            <div className="d-flex justify-content-center my-3">
                                <Link to="/Aliens">
                                    <img src={require('../images/goback.gif')} />
                                </Link>
                            </div>
                        </main>
                    </Col>
                    <Col md={3}>
                    </Col>
                </Row>
                {/* <Footer /> */}
            </ScrollIntoView>
        </div>
    );
}
