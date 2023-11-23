import { Outlet } from 'react-router-dom';

import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { Container } from "reactstrap";
import ScrollToTop from "./ScrollToTop";

export default function Layout(props) {

    // const [title, setTitle] = useState("")

    // const matches = useMatches();
    // const match = matches.filter((match) => Boolean(match.handle?.breadcrumb)).at(-1)
    // useEffect(() => {
    //     async function fetchTitle() {
    //         const title = await match.handle.breadcrumb(match.data)
    //         return title
    //     }
    //     fetchTitle().then((title) => {console.log(title); setTitle(title)})
    // }, [match])

    return (
        <>
            {/* <HelmetProvider>
                <Helmet>
                    <title>The Praw {title ? `- ${title}` : ""}</title>
                </Helmet>
            </HelmetProvider> */}
            <>
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
            </>
        </>
    );
}
