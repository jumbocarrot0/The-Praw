//Pages
import Home from "./pages/HomePage";
import Results from "./pages/ResultsPage";
import Combos from "./pages/CombosPage";
import SelectionPage from "./pages/SelectionPage";
import AlienListPage from "./pages/Lists/AlienListPage";
import IndividualAlienPage from "./pages/IndividualAlienPage";
import ThrowbackPage from "./pages/ThrowbackPage";
import VariantsListPage from './pages/Lists/VariantsListPage';
import TechListPage from './pages/Lists/TechListPage';
import IndividualTechPage from "./pages/IndividualTechPage";
import HazardListPage from './pages/Lists/HazardListPage';
import IndividualHazardPage from "./pages/IndividualHazardPage";
import StationListPage from './pages/Lists/StationListPage';
import IndividualStationPage from "./pages/IndividualStationPage";
import LuxListPage from './pages/Lists/LuxListPage';
import IndividualLuxPage from "./pages/IndividualLuxPage";
import MoonListPage from './pages/Lists/MoonListPage';
import IndividualMoonPage from "./pages/IndividualMoonPage";
import EvolutionListPage from './pages/Lists/EvolutionListPage';
import IndividualEvolutionPage from "./pages/IndividualEvolutionPage";
import ObjectivesListPage from './pages/Lists/ObjectivesListPage';
import IndividualObjectivePage from "./pages/IndividualObjectivePage";
import RewardsDeckPage from "./pages/RewardsDeckPage";
import TeamCosmicPage from "./pages/TeamCosmicPage";
import AllianceDialPage from "./pages/AllianceDialPage";
import ForeignAidPage from "./pages/ForeignAidPage";

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
      path: "/Combos",
      element: <Combos />,
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
      element: <RewardsDeckPage />
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
    }
]