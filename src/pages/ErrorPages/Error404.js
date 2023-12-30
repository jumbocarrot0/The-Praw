import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Error404() {
    const navigate = useNavigate();

    return (
        <div className="text-center mt-5">
            <h1>Page not Found</h1>
            <p>Either this page used to exist but now does not, or the URL was entered wrong. If you got here through a link on this site then let the developer know something has gone wrong.</p>
            <Button onClick={() => navigate(-1)} color="primary">Go Back</Button>
        </div>
    );
}