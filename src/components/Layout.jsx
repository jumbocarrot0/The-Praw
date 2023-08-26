import { Container } from "reactstrap";

export default function Layout(props) {
    return (
        <div className="App">
            <main>
                <Container>
                    {props.children}
                </Container>
            </main>
        </div>
    );
}
