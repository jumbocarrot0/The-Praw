import {
    Container,
    Card,
    CardBody,
    Row,
    Col,
    Badge

} from 'reactstrap';
import { Link } from "react-router-dom"

function Variant(props) {
    return (
        <Card className='mb-5'>
            <Link className={"btn btn-dark border border-5 " +
            (props.complexity === 1 ? "border-success" : props.complexity === 2 ? "border-warning" : "border-danger")}
                to={props.to} reloadDocument>
                <CardBody>
                    <h2>{props.name}</h2>
                    <h6 className="align-items-center">
                        <Badge className={props.complexity === 2 ? " text-dark" : ""}
                            color={props.complexity === 1 ? "success" : props.complexity === 2 ? "warning" : "danger"}>
                            {["", "Simple", "Intermediate", "Expert"][props.complexity]}
                        </Badge>
                    </h6>
                    <strong>{props.desc}</strong>
                </CardBody>
            </Link>
        </Card>
    )
}

export default function VariantsListPage() {

    const variants = [
        { name: "Technology", image: "", complexity: 2, desc: "Research Powerful Techs", href: "/Variants/Tech" },
        { name: "Rewards Deck", image: "", complexity: 1, desc: "Special Deck for Rewards", href: "" },
        { name: "Hazards", image: "", complexity: 1, desc: "Random Events", href: "/Variants/Hazard" },
        { name: "Space Stations", image: "", complexity: 2, desc: "Attach Abilities to Planets", href: "/Variants/Stations" },
        { name: "Evolutions", image: "", complexity: 2, desc: "Mutate with Ships", href: "" },
        { name: "Moons", image: "", complexity: 3, desc: "Discover Abilities on Planets", href: "" },
        { name: "Lux", image: "", complexity: 3, desc: "Stardust Economy", href: "" },
        { name: "Array Objectives", image: "", complexity: 2, desc: "Win with Points", href: "" },
        { name: "Team Cosmic", image: "", complexity: 1, desc: "Play in Pairs", href: "" },
        { name: "Alliance Dials", image: "", complexity: 1, desc: "Simultaneous Alliance Phase", href: ""},
        { name: "Campaign Mode", image: "", complexity: 3, desc: "4+ Games of Legacy Cosmic", href: "" },
    ]

    let groupByN = (n, arr) => {
        let result = [];
        for (let i = 0; i < arr.length; i += n) result.push(arr.slice(i, i + n));
        return result;
    };

    return (
        <Container>
            <h1 className='mb-4'>Official Variants</h1>
            <hr class="border border-light border-2 opacity-100 mb-5"/>
            {groupByN(3, variants).map((variants) => {
                return (
                    <Row>
                        {variants.map((variant) => {
                            return (<Col lg={4}>
                                <Variant name={variant.name} desc={variant.desc} complexity={variant.complexity} to={variant.href}/>
                            </Col>)
                        })}
                    </Row>
                )
            })}
        </Container>
    );
}