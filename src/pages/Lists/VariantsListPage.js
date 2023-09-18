import Item from '../../components/Item'
import GridBrowser from "../../components/GridBrowser";
import Layout from '../../components/Layout'

export default function VariantsListPage() {

    const variants = {
        "FourPlanets": { name: "Four Planets", image: "", complexity: 1, short: "Shorter Game", thumbnail: "variant icons/4 Planets Icon.png" },
        "FreewheelingFlares": { name: "Freewheeling Flares", image: "", complexity: 2, short: "No Flare Limit", thumbnail: "variant icons/Freewheeling Icon.png" },
        "Techs": { name: "Technology", image: "", complexity: 2, short: "Research Powerful Techs", thumbnail: "variant icons/Tech Icon.png" },
        "RewardsDeck": { name: "Rewards Deck", image: "", complexity: 1, short: "Special Deck for Rewards", thumbnail: "variant icons/Rewards Icon.png" },
        "CommonRewards": { name: "Common Rewards", image: "", complexity: 1, short: "Add Reward Cards to Deck", thumbnail: "variant icons/Common Icon.png" },
        "Hazards": { name: "Hazards", image: "", complexity: 1, short: "Random Events", thumbnail: "variant icons/Hazard Icon.png" },
        "TeamMode": { name: "Team Cosmic", image: "", complexity: 1, short: "Play in Pairs", thumbnail: "variant icons/Alliance Icon.png" },
        "Stations": { name: "Space Stations", image: "", complexity: 2, short: "Attach Abilities to Planets", thumbnail: "variant icons/Stations Icon.png" },
        "Dials": { name: "Hidden Alliances", image: "", complexity: 1, short: "Join Side via Dial", thumbnail: "variant icons/Dial Icon.png" },
        "ForeignAid": { name: "Foreign Aid", image: "", complexity: 1, short: "Give Help as Ally", thumbnail: "variant icons/Foreign Aid Icon.png" },
        "Evolutions": { name: "Evolutions", image: "", complexity: 2, short: "Mutate with Ships", thumbnail: "variant icons/Evolution Icon.png" },
        "Moons": { name: "Moons", image: "", complexity: 3, short: "Discover Abilities on Planets", thumbnail: "variant icons/Moon Icon.png" },
        "Lux": { name: "Lux", image: "", complexity: 3, short: "Stardust Economy", thumbnail: "variant icons/Lux Icon.png" },
        "Objectives": { name: "Array Objectives", image: "", complexity: 2, short: "Win with Points", thumbnail: "variant icons/Objectives Icon.png" },
        "Campaign": { name: "Campaign Mode", image: "", complexity: 3, short: "4+ Games of Legacy Cosmic", thumbnail: "variant icons/Campaign Icon 2.png" },
        "Supershots": { name: "Super Shots", image: "", complexity: 2, short: "Alternate Flare Use (Fan Variant)", thumbnail: "variant icons/Super Shots Icon.png" },
        "HandDraft": { name: "Hand Draft", image: "", complexity: 1, short: "Curate Starting Hand (Fan Variant)", thumbnail: "variant icons/Hand Draft Icon.png" },
        "Contracts": { name: "Contracts", image: "", complexity: 3, short: "Spices Up Deals (Fan Variant)", thumbnail: "variant icons/Contract Icon.png" },
        "Envoys": { name: "Envoys", image: "", complexity: 2, short: "Secondary Alien Powers (Quasi-Fan Variant)", thumbnail: "variant icons/Envoy Icon.png" },
        "AlienInfluencers": { name: "Alien Influencers", image: "", complexity: 3, short: "Sway Out-of-Play Aliens (Fan Variant)", thumbnail: "variant icons/Influencers Icon.png" },
        "SpecialShips": { name: "Special Ships", image: "", complexity: 2, short: "Abilities Tied to Ships (Fan Variant)", thumbnail: "variant icons/Special Ship Icon.png" },
        "Anomalies": { name: "Anomalies", image: "", complexity: 3, short: "Unique Systems (Fan Variant)", thumbnail: "variant icons/Anomalies Icon.png" },
    }

    return (
        <Layout title="Variants">
            <h1 className='mb-4'>Official Variants</h1>
            <hr className="border border-light border-2 opacity-100 mb-5" />
            <GridBrowser cardTemplate={Item}
                noSort={true}
                url="/Variants"
                content={variants}
                border={(variant) => {
                    const borders = { 1: "success", 2: "warning", 3: "danger" };
                    return borders[variant.complexity];
                }}
                type={(variant) => { return { 1: "Beginner", 2: "Intermediate", 3: "Advanced" }[variant.complexity] }}
                width={4}
            />
        </Layout>
    );
}