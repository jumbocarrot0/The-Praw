import {
    Container,
    Row,
    Col
} from 'reactstrap';
import Item from '../../components/Item'
import GridBrowser from "../../components/GridBrowser";

export default function VariantsListPage() {

    const variants = {
        "Techs": { name: "Technology", image: "", complexity: 2, short: "Research Powerful Techs" },
        "Rewards": { name: "Rewards Deck", image: "", complexity: 1, short: "Special Deck for Rewards" },
        "Hazards": { name: "Hazards", image: "", complexity: 1, short: "Random Events" },
        "TeamMode": { name: "Team Cosmic", image: "", complexity: 1, short: "Play in Pairs" },
        "Stations": { name: "Space Stations", image: "", complexity: 2, short: "Attach Abilities to Planets" },
        "Dials": { name: "Alliance Dials", image: "", complexity: 1, short: "Simultaneous Alliance Phase" },
        "Evolutions": { name: "Evolutions", image: "", complexity: 2, short: "Mutate with Ships" },
        "Moons": { name: "Moons", image: "", complexity: 3, short: "Discover Abilities on Planets" },
        "Lux": { name: "Lux", image: "", complexity: 3, short: "Stardust Economy" },
        "Objectives": { name: "Array Objectives", image: "", complexity: 2, short: "Win with Points" },
        "Campaign": { name: "Campaign Mode", image: "", complexity: 3, short: "4+ Games of Legacy Cosmic" },
    }

    let groupByN = (n, arr) => {
        let result = [];
        for (let i = 0; i < arr.length; i += n) result.push(arr.slice(i, i + n));
        return result;
    };

    return (
        <Container>
            <h1 className='mb-4'>Official Variants</h1>
            <hr class="border border-light border-2 opacity-100 mb-5" />
            <GridBrowser cardTemplate={Item}
                noSort={true}
                url="/Variants"
                content={variants}
                border={(variant) => {
                    const borders = { 1: "success", 2: "warning", 3: "danger" };
                    return borders[variant.complexity];
                }}
            />
            {/* {groupByN(3, variants).map((variants) => {
                return (
                    <Row>
                        {variants.map((variant) => {
                            return (<Col lg={4}>
                                <Item content={{ "original": variant }} to={variant.href}
                                    border={(item) => {
                                        return { 1: "success", 2: "warning", 3: "danger" }[item.complexity];
                                    }} />
                            </Col>)
                        })}
                    </Row>
                )
            })} */}
        </Container>
    );
}