import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { Container } from "reactstrap";

export default function Layout(props) {
    return (
        <div className="App">
            <Header />
            <main>
                <Container>
                    <Breadcrumbs />
                    {props.children}
                </Container>
            </main>
            <Footer />
        </div>
    );
}
