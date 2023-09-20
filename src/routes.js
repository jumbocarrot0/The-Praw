//Pages
import Home from "./pages/HomePage";
import Results from "./pages/ResultsPage";
import Combos from "./pages/CombosPage";
import CombosSubmit from "./pages/CombosSubmitPage";
import HouseRulesPage from "./pages/HouseRulesPage";
import SelectionPage from "./pages/SelectionPage";
import GeekPage from "./pages/GeekPage";

import Error404Page from "./pages/ErrorPages/Error404";

import AlienListPage from "./pages/Lists/AlienListPage";
import IndividualAlienPage from "./pages/IndividualItem/IndividualAlienPage";
import ThrowbackPage from "./pages/IndividualItem/ThrowbackPage";
import VariantsListPage from './pages/Lists/VariantsListPage';
import TechListPage from './pages/Lists/TechListPage';
import IndividualTechPage from "./pages/IndividualItem/IndividualTechPage";
import HazardListPage from './pages/Lists/HazardListPage';
import IndividualHazardPage from "./pages/IndividualItem/IndividualHazardPage";
import StationListPage from './pages/Lists/StationListPage'; 
import IndividualStationPage from "./pages/IndividualItem/IndividualStationPage";
import LuxListPage from './pages/Lists/LuxListPage';
import IndividualLuxPage from "./pages/IndividualItem/IndividualLuxPage";
import MoonListPage from './pages/Lists/MoonListPage';
import IndividualMoonPage from "./pages/IndividualItem/IndividualMoonPage";
import EvolutionListPage from './pages/Lists/EvolutionListPage';
import IndividualEvolutionPage from "./pages/IndividualItem/IndividualEvolutionPage";
import ObjectivesListPage from './pages/Lists/ObjectivesListPage';
import IndividualObjectivePage from "./pages/IndividualItem/IndividualObjectivePage";
import RewardsDeckPage from "./pages/Variants/RewardsDeckPage";
import TeamCosmicPage from "./pages/Variants/TeamCosmicPage";
import AllianceDialPage from "./pages/Variants/AllianceDialPage";
import ForeignAidPage from "./pages/Variants/ForeignAidPage";
import CampaignPage from "./pages/Variants/CampaignPage";

import FourPlanetsPage from "./pages/Variants/FourPlanetsPage";
import FreewheelingPage from "./pages/Variants/FreewheelingPage";
import SuperShotsPage from "./pages/Variants/SuperShotsPage";
import HandDraftPage from "./pages/Variants/HandDraftPage";
import CommonRewardsPage from "./pages/Variants/CommonRewardsPage";
import ContractsPage from "./pages/Lists/ContractsListPage";
import SpecialShipsPage from "./pages/Lists/SpecialShipsListPage";
import AnomaliesPage from "./pages/Lists/AnomaliesListPage";
import AlienInfluencersPage from "./pages/Variants/AlienInfluencersPage";
import EnvoysPage from "./pages/Lists/EnvoysListPage";

import Aliens from './dataFiles/aliens.json'
import Techs from './dataFiles/technology.json'
import Hazards from './dataFiles/hazards.json'
import Stations from './dataFiles/stations.json'
import Lux from './dataFiles/lux.json'
import Evolutions from './dataFiles/evolutions.json'
import Moons from './dataFiles/moons.json'
import Objectives from './dataFiles/objectives.json'

// const AlienBreadcrumb = ({ match }) => Aliens.aliens[match.params.alienIndex].original.name;

export const routes = [
    {
      path: "/",
      element: <Home />,
      breadcrumb: "Home",
    },
    {
      path: "/Search",
      element: <Results />,
      breadcrumb: "Search",
    },
    {
      path: "/HouseRules",
      element: <HouseRulesPage />,
      breadcrumb: "House Rules",
    },
    {
      path: "/Combos",
      element: <Combos />,
    },
    {
      path: "/Combos/Submit",
      element: <CombosSubmit />,
    },
    {
      path: "/Geek",
      element: <GeekPage />,
    },
    {
      path: "/Aliens",
      element: <AlienListPage />,
    },
    {
      path: "/Aliens/221",
      element: <ThrowbackPage />,
      breadcrumb: () => Aliens.aliens["221"].original.name
    },
    {
      path: "/Aliens/:alienIndex",
      element: <IndividualAlienPage />,
      breadcrumb: ({ match }) => Aliens.aliens[match.params.alienIndex].original.name
    },
    {
      path: '/Selection',
      element: <SelectionPage />,
    },
    {
      path: "/Variants",
      element: <VariantsListPage />
    },
    {
      path: "/Variants/FourPlanets",
      element: <FourPlanetsPage />,
      breadcrumb: "Four Planets"
    },
    {
      path: "/Variants/Freewheeling",
      element: <FreewheelingPage />,
      breadcrumb: "Freewheeling Flares"
    },
    {
      path: "/Variants/CommonRewards",
      element: <CommonRewardsPage />,
      breadcrumb: "Common Rewards"
    },
    {
      path: "/Variants/Techs",
      element: <TechListPage />
    },
    {
      path: "/Variants/Techs/:techIndex",
      element: <IndividualTechPage />,
      breadcrumb: ({ match }) => Techs.technologies[match.params.techIndex].original.name
    },
    {
      path: "/Variants/Hazards",
      element: <HazardListPage />
    },
    {
      path: "/Variants/Hazards/:hazardIndex",
      element: <IndividualHazardPage />,
      breadcrumb: ({ match }) => Hazards.hazards[match.params.hazardIndex].original.name
    },
    {
      path: "/Variants/Stations",
      element: <StationListPage />
    },
    {
      path: "/Variants/Stations/:stationIndex",
      element: <IndividualStationPage />,
      breadcrumb: ({ match }) => Stations.stations[match.params.stationIndex].original.name
    },
    {
      path: "/Variants/Lux",
      element: <LuxListPage />
    },
    {
      path: "/Variants/Lux/:luxIndex",
      element: <IndividualLuxPage />,
      breadcrumb: ({ match }) => Lux.lux[match.params.luxIndex].original.name
    },
    {
      path: "/Variants/Moons",
      element: <MoonListPage />
    },
    {
      path: "/Variants/Moons/:moonIndex",
      element: <IndividualMoonPage />,
      breadcrumb: ({ match }) => Moons.moons[match.params.moonIndex].original.name
    },
    {
      path: "/Variants/Evolutions",
      element: <EvolutionListPage />
    },
    {
      path: "/Variants/Evolutions/:evolutionIndex",
      element: <IndividualEvolutionPage />,
      breadcrumb: ({ match }) => Evolutions.evolutions[match.params.evolutionIndex].original.name
    },
    {
      path: "/Variants/Objectives",
      element: <ObjectivesListPage />
    },
    {
      path: "/Variants/Objectives/:objectiveIndex",
      element: <IndividualObjectivePage />,
      breadcrumb: ({ match }) => Objectives.objectives[match.params.objectiveIndex].original.name
    },
    {
      path: "/Variants/RewardsDeck",
      element: <RewardsDeckPage />,
      breadcrumb: "Rewards Deck"
    },
    {
      path: "/Variants/TeamMode",
      element: <TeamCosmicPage />
    },
    {
      path: "/Variants/Dials",
      element: <AllianceDialPage />,
      breadcrumb: "Hidden Alliances"
    },
    {
      path: "/Variants/ForeignAid",
      element: <ForeignAidPage />,
      breadcrumb: "Foreign Aid"
    },
    {
      path: "/Variants/Campaign",
      element: <CampaignPage />,
      breadcrumb: "Campaign Mode"
    },
    {
      path: "/Variants/Supershots",
      element: <SuperShotsPage />,
      breadcrumb: "Super Shots"
    },
    {
      path: "/Variants/HandDraft",
      element: <HandDraftPage />,
      breadcrumb: "Hand Draft"
    },
    {
      path: "/Variants/Contracts",
      element: <ContractsPage />
    },
    {
      path: "/Variants/SpecialShips",
      element: <SpecialShipsPage />,
      breadcrumb: "Special Ships"
    },
    {
      path: "/Variants/Anomalies",
      element: <AnomaliesPage />
    },
    {
      path: "/Variants/AlienInfluencers",
      element: <AlienInfluencersPage />,
      breadcrumb: "Alien Influencers"
    },
    {
      path: "/Variants/Envoys",
      element: <EnvoysPage />
    },
    {
      path: "/*",
      element: <Error404Page />,
      breadcrumb: "",
    }
]