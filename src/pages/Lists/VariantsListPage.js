import Item from '../../components/Item'
import GridBrowser from "../../components/GridBrowser";

export default function VariantsListPage() {

    const official_variants = {
        "FourPlanets": { name: "Four Planets", complexity: 1, short: "Shorter Game", thumbnail: "variant icons/4 Planets Icon.png" },
        "FreewheelingFlares": { name: "Freewheeling Flares", complexity: 2, short: "No Flare Limit", thumbnail: "variant icons/Freewheeling Icon.png" },
        "Techs": { name: "Technology", complexity: 2, short: "Research Powerful Techs", thumbnail: "variant icons/Tech Icon.png" },
        "RewardsDeck": { name: "Rewards Deck", complexity: 1, short: "Special Deck for Rewards", thumbnail: "variant icons/Rewards Icon.png" },
        "CommonRewards": { name: "Common Rewards", complexity: 1, short: "Add Reward Cards to Deck", thumbnail: "variant icons/Common Icon.png" },
        "Hazards": { name: "Hazards", complexity: 1, short: "Random Events", thumbnail: "variant icons/Hazard Icon.png" },
        "TeamMode": { name: "Team Cosmic", complexity: 1, short: "Play in Pairs", thumbnail: "variant icons/Alliance Icon.png" },
        "Stations": { name: "Space Stations", complexity: 2, short: "Attach Abilities to Planets", thumbnail: "variant icons/Stations Icon.png" },
        "Dials": { name: "Hidden Alliances", complexity: 1, short: "Join Side via Dial", thumbnail: "variant icons/Dial Icon.png" },
        "ForeignAid": { name: "Foreign Aid", complexity: 1, short: "Give Help as Ally", thumbnail: "variant icons/Foreign Aid Icon.png" },
        "Evolutions": { name: "Evolutions", complexity: 2, short: "Mutate with Ships", thumbnail: "variant icons/Evolution Icon.png" },
        "Moons": { name: "Moons", complexity: 3, short: "Discover Abilities on Planets", thumbnail: "variant icons/Moon Icon.png" },
        "Lux": { name: "Lux", complexity: 3, short: "Stardust Economy", thumbnail: "variant icons/Lux Icon.png" },
        "Objectives": { name: "Array Objectives", complexity: 2, short: "Win with Points", thumbnail: "variant icons/Objectives Icon.png" },
        "Campaign": { name: "Campaign Mode", complexity: 3, short: "4+ Games of Legacy Cosmic", thumbnail: "variant icons/Campaign Icon 2.png" }
    }

    const fan_variants = {
        "Supershots": { name: "Super Shots", complexity: 2, short: "Alternate Flare Use", thumbnail: "variant icons/Super Shots Icon.png" },
        "HandDraft": { name: "Hand Draft", complexity: 1, short: "Curate Starting Hand", thumbnail: "variant icons/Hand Draft Icon.png" },
        "Contracts": { name: "Contracts", complexity: 3, short: "Spices Up Deals", thumbnail: "variant icons/Contract Icon.png" },
        "Envoys": { name: "Envoys", complexity: 2, short: "Secondary Alien Powers", thumbnail: "variant icons/Envoy Icon.png" },
        "AlienInfluencers": { name: "Alien Influencers", complexity: 3, short: "Sway Out-of-Play Aliens", thumbnail: "variant icons/Influencers Icon.png" },
        "SpecialShips": { name: "Special Ships", complexity: 2, short: "Abilities Tied to Ships", thumbnail: "variant icons/Special Ship Icon.png" },
        "Anomalies": { name: "Anomalies", complexity: 3, short: "Unique Systems", thumbnail: "variant icons/Anomalies Icon.png" },
        "WinLimitation": { name: "Win Limitation", complexity: 1, short: "Minmise Shared Wins", thumbnail: "variant icons/Win Limit Icon.png" },
    }

    return (
        <div>
            <h1 className='mb-4'>Official Variants</h1>
            <hr className="border border-light border-2 opacity-100 mb-5" />
            <GridBrowser cardTemplate={Item}
                noSort={true}
                url="/Variants"
                content={official_variants}
                border={(variant) => {
                    const borders = { 1: "success", 2: "warning", 3: "danger" };
                    return borders[variant.complexity];
                }}
                type={(variant) => { return { 1: "Beginner", 2: "Intermediate", 3: "Advanced" }[variant.complexity] }}
                width={4}
            />
            <h1 className='mb-4'>Fan Variants</h1>
            <hr className="border border-light border-2 opacity-100 mb-5" />
            <GridBrowser cardTemplate={Item}
                noSort={true}
                url="/Variants"
                content={fan_variants}
                border={(variant) => {
                    const borders = { 1: "success", 2: "warning", 3: "danger" };
                    return borders[variant.complexity];
                }}
                type={(variant) => { return { 1: "Beginner", 2: "Intermediate", 3: "Advanced" }[variant.complexity] }}
                width={4}
            />
        </div>
    );
}