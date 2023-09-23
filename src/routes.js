//Pages

import Layout from "./components/Layout";

import Home from "./pages/HomePage";
import Results from "./pages/ResultsPage";
import Combos from "./pages/CombosPage";
import CombosSubmit from "./pages/CombosSubmitPage";
import HouseRulesPage from "./pages/HouseRulesPage";
import SelectionPage from "./pages/SelectionPage";
import GeekPage from "./pages/GeekPage";
import HiddenDialPage from "./pages/HiddenDialPage"

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

import Aliens from './dataFiles/aliens.json'
import Techs from './dataFiles/technology.json'
import Hazards from './dataFiles/hazards.json'
import Stations from './dataFiles/stations.json'
import Lux from './dataFiles/lux.json'
import Evolutions from './dataFiles/evolutions.json'
import Moons from './dataFiles/moons.json'
import Objectives from './dataFiles/objectives.json'

import { getAlien } from "./supabaseAPI/getAlien"

// const AlienBreadcrumb = ({ match }) => Aliens.aliens[match.params.alienIndex].original.name;

const itemPageBreadcrumb = (data) => data.original.name

const itemPageRoute = (rootpath, crumb, indexpath, list, item, loader) => ({
  path: rootpath,
  handle: {
    breadcrumb: () => crumb
  },
  children: [
    {
      index: true,
      element: list,
    },
    {
      path: `:${indexpath}`,
      element: item,
      loader: loader,
      handle: {
        breadcrumb: itemPageBreadcrumb
      }
    },
  ]
}
)

export const routes = [
  {
    element: <Layout />,
    handle: {
      breadcrumb: () => "Home"
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Search",
        element: <Results />,
        handle: {
          breadcrumb: () => "Search"
        }
      },
      {
        path: "/HouseRules",
        element: <HouseRulesPage />,
        handle: {
          breadcrumb: () => "House Rules"
        }
      },
      {
        path: "Combos",
        handle: {
          breadcrumb: () => "Combos"
        },
        children: [
          {
            index: true,
            element: <Combos />
          },
          {
            path: "Submit",
            element: <CombosSubmit />,
            handle: {
              breadcrumb: () => "Submit"
            }
          }
        ]
      },
      {
        path: "/Geek",
        element: <GeekPage />,
        handle: {
          breadcrumb: () => "Geek Practice"
        }
      },
      {
        path: "/DigitalDial",
        element: <HiddenDialPage />,
        handle: {
          breadcrumb: () => "Digital Alliance Dial"
        }
      },
      {
        path: "Aliens",
        handle: {
          breadcrumb: () => "Aliens"
        },
        children: [
          {
            index: true,
            element: <AlienListPage />
          },
          {
            element: <IndividualAlienPage />,
            path: ":alienIndex",
            loader: async ({ params }) => getAlien(params.alienIndex),
            handle: {
              breadcrumb: itemPageBreadcrumb
            }
          }
        ]
      },
      {
        path: '/Selection',
        element: <SelectionPage />,
        handle: {
          breadcrumb: () => "Alien Selection"
        }
      },
      {
        path: "Variants",
        handle: {
          breadcrumb: () => "Variants"
        },
        children: [
          {
            index: true,
            element: <VariantsListPage />
          },

          itemPageRoute(
            "Techs",
            "Techs",
            "techIndex",
            <TechListPage />,
            <IndividualTechPage />,
            ({ params }) => Techs.technologies[params.techIndex]
          ),

          itemPageRoute(
            "Hazards",
            "Hazards",
            "hazardIndex",
            <HazardListPage />,
            <IndividualHazardPage />,
            ({ params }) => Hazards.hazards[params.hazardIndex]
          ),

          itemPageRoute(
            "Stations",
            "Space Stations",
            "stationIndex",
            <StationListPage />,
            <IndividualStationPage />,
            ({ params }) => Stations.stations[params.stationIndex]
          ),

          itemPageRoute(
            "Lux",
            "Lux",
            "luxIndex",
            <LuxListPage />,
            <IndividualLuxPage />,
            ({ params }) => Lux.lux[params.luxIndex]
          ),

          itemPageRoute(
            "Moons",
            "Moons",
            "moonIndex",
            <MoonListPage />,
            <IndividualMoonPage />,
            ({ params }) => Moons.moons[params.moonIndex]
          ),

          itemPageRoute(
            "Evolutions",
            "Evolutions",
            "evolutionIndex",
            <EvolutionListPage />,
            <IndividualEvolutionPage />,
            ({ params }) => Evolutions.evolutions[params.evolutionIndex]
          ),

          itemPageRoute(
            "Objectives",
            "Objectives",
            "objectiveIndex",
            <ObjectivesListPage />,
            <IndividualObjectivePage />,
            ({ params }) => Objectives.objectives[params.objectiveIndex]
          ),

          {
            path: "RewardsDeck",
            element: <RewardsDeckPage />,
            handle: {
              breadcrumb: () => "Rewards Deck"
            }
          },
          {
            path: "TeamMode",
            element: <TeamCosmicPage />,
            handle: {
              breadcrumb: () => "Team Cosmic"
            }
          },
          {
            path: "Dials",
            element: <AllianceDialPage />,
            handle: {
              breadcrumb: () => "Hidden Alliances"
            }
          },
          {
            path: "ForeignAid",
            element: <ForeignAidPage />,
            handle: {
              breadcrumb: () => "Foreign Aid"
            }
          },
          {
            path: "Campaign",
            element: <CampaignPage />,
            handle: {
              breadcrumb: () => "Campaign Mode"
            }
          },

        ]
      }
    ]
  },
  {
    element: <ThrowbackPage />,
    path: "Aliens/221",
    handle: {
      breadcrumb: () => "Throwback"
    }
  },
  {
    path: "*",
    element: <Error404Page />,
    handle: {
      breadcrumb: () => "404"
    }
  }
]