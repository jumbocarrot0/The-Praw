//Pages
import React from "react";
import { Await, defer } from "react-router-dom"
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Layout from "./components/Layout";
// import Loading from "./components/Loading";

import Home from "./pages/HomePage";
import Results from "./pages/ResultsPage";
import Combos from "./pages/CombosPage";
import CombosSubmit from "./pages/CombosSubmitPage";
import HouseRulesPage from "./pages/HouseRulesPage";
// import SelectionPage from "./pages/SelectionPage";
import GeekPage from "./pages/GeekPage";
import HiddenDialPage from "./pages/HiddenDialPage"
import SelectionMethodsPage from "./pages/Lists/Campaign/SelectionMethodsPage";

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
import IndividualSpecialShipPage from "./pages/IndividualItem/IndividualSpecialShipPage";
// import AnomaliesPage from "./pages/Lists/AnomaliesListPage";
import AlienInfluencersPage from "./pages/Variants/AlienInfluencersPage";
import EnvoysPage from "./pages/Lists/EnvoysListPage";
import IndividualEnvoyPage from "./pages/IndividualItem/IndividualEnvoyPage";
import WinLimitationPage from "./pages/Variants/WinLimitationPage"

import AgesPage from "./pages/Lists/Campaign/AgeListPage";
import MasterPage from "./pages/Lists/Campaign/MasterListPage";
import IndividualMasterPage from "./pages/Lists/Campaign/IndividualMasterPage";
import WrenchPage from "./pages/Lists/Campaign/WrenchListPage";
import IndividualWrenchPage from "./pages/Lists/Campaign/IndividualWrenchPage";
import PrivilegePage from "./pages/Lists/Campaign/PrivilegeListPage";
import IndividualPrivilegePage from "./pages/Lists/Campaign/IndividualPrivilegePage";

import Aliens from './dataFiles/aliens.json'
import faq from "./dataFiles/faq.json"
import Techs from './dataFiles/technology.json'
import Hazards from './dataFiles/hazards.json'
import Stations from './dataFiles/stations.json'
import Lux from './dataFiles/lux.json'
import Evolutions from './dataFiles/evolutions.json'
import Moons from './dataFiles/moons.json'
import Objectives from './dataFiles/objectives.json'
import Envoys from './dataFiles/envoys.json'
import SpecialShips from './dataFiles/specialShips.json'
import Ages from './dataFiles/ages.json'
import Wrenches from './dataFiles/wrenches.json'
import Privileges from './dataFiles/privileges.json'

import RevisionNotes from "./dataFiles/revisionNotes.json"

// import { getAlien, getAllAliens } from "./supabaseAPI/getAlien"

// const AlienBreadcrumb = ({ match }) => Aliens.aliens[match.params.alienIndex].original.name;

const itemPageBreadcrumb = (data) => data ? data.name ?? data.original.name : ""

const itemPageRoute = (rootpath, crumb, indexpath, list, item, loader, parentLoader) => ({
    path: rootpath,
    id: rootpath.toLowerCase(),
    handle: {
        breadcrumb: () => crumb
    },
    loader: parentLoader,
    children: [
        {
            index: true,
            element: list,
        },
        {
            path: `:${indexpath}`,
            element: item,
            loader: loader,
            id: indexpath,
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
        // errorElement: <Error404Page />,
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
                id: "aliens",
                loader: () => {
                    const fields = ["powerName", "powerBody", "powerSpecialName", "powerSpecialBody", "wildBody", "superBody", "short", "history"]
                    const timing_fields = ["player", "phases"]
                    let data = Aliens.aliens

                    for (const index of Object.keys(data)) {
                        for (const field of fields) {
                            data[index][field]?.forEach((revision, i) => {
                                if (revision?.revisionID || revision?.revisionID === 0) {
                                    data[index][field][i].revisionNote = RevisionNotes.aliens[index][revision?.revisionID]
                                }
                            })
                        }
                        for (const parent of ["powerTiming", "wildTiming", "superTiming"]){
                            for (const field of timing_fields) {
                                data[index][parent][field]?.forEach((revision, i) => {
                                    if (revision?.revisionID || revision?.revisionID === 0) {
                                        data[index][parent][field][i].revisionNote = RevisionNotes.aliens[index][revision?.revisionID]
                                    }
                                })
                            }
                        }
                    }

                    return data
                },
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
                        loader: ({ params }) => {
                            // const alienDataPromise = getAlien(params.alienIndex)
                            // return defer({ alien: alienDataPromise })
                            let data = Aliens.aliens[params.alienIndex]
                            if (faq.aliens[params.alienIndex]) {
                                data.faq = faq.aliens[params.alienIndex]
                            } else {
                                data.faq = []
                            }
                            return data
                        },
                        id: "alienIndex",
                        handle: {
                            breadcrumb: (alien) => (
                                <React.Suspense fallback={null}>
                                    <Await
                                        resolve={alien}
                                        errorElement={
                                            <p>Error loading alien!</p>
                                        }
                                    >
                                        {(alien) => alien.name}
                                    </Await>
                                </React.Suspense>
                            ),
                            title: (alien) => (
                                <React.Suspense fallback={null}>
                                    <Await
                                        resolve={alien}
                                        errorElement={
                                            <HelmetProvider>
                                                <Helmet>
                                                    <title>The Praw</title>
                                                </Helmet>
                                            </HelmetProvider>
                                        }
                                    >
                                        {(alien) => (
                                            <HelmetProvider>
                                                <Helmet>
                                                    <title>The Praw - {alien.name}</title>
                                                </Helmet>
                                            </HelmetProvider>
                                        )}
                                    </Await>
                                </React.Suspense>
                            )
                        }
                    }
                ]
            },
            // {
            //     path: '/Selection',
            //     element: <SelectionPage />,
            //     handle: {
            //         breadcrumb: () => "Alien Selection"
            //     }
            // },
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

                    {
                        path: "Campaign",
                        handle: {
                            breadcrumb: () => "Campaign Mode"
                        },
                        children: [
                            {
                                index: true,
                                element: <CampaignPage />
                            },

                            itemPageRoute(
                                "Ages",
                                "Ages",
                                "ageIndex",
                                <AgesPage />,
                                null,
                                ({ params }) => Ages.ages[params.ageIndex],
                                () => { return Ages }
                            ),
                            itemPageRoute(
                                "MasterCards",
                                "Master Cards",
                                "masterIndex",
                                <MasterPage />,
                                <IndividualMasterPage />,
                                ({ params }) => Ages.master[params.masterIndex],
                                () => Ages.master
                            ),
                            itemPageRoute(
                                "WrenchCards",
                                "Wrench Cards",
                                "wrenchIndex",
                                <WrenchPage />,
                                <IndividualWrenchPage />,
                                ({ params }) => Wrenches.wrench[params.wrenchIndex],
                                () => Wrenches.wrench
                            ),
                            itemPageRoute(
                                "PrivilegeCards",
                                "Privilege Cards",
                                "privilegeIndex",
                                <PrivilegePage />,
                                <IndividualPrivilegePage />,
                                ({ params }) => Privileges.privilege[params.privilegeIndex],
                                () => Privileges.privilege
                            ),
                            itemPageRoute(
                                "Envoys",
                                "Envoys",
                                "envoyIndex",
                                <EnvoysPage />,
                                <IndividualEnvoyPage />,
                                ({ params }) => Envoys.envoys[params.envoyIndex],
                                () => {
                                    const fields = ["body", "history"]
                                    const timing_fields = ["player", "phases"]
                                    let data = Envoys.envoys

                                    for (const index of Object.keys(data)) {
                                        for (const field of fields) {
                                            data[index][field]?.forEach((revision, i) => {
                                                if (revision?.revisionID || revision?.revisionID === 0) {
                                                    data[index][field][i].revisionNote = RevisionNotes.envoys[index][revision?.revisionID]
                                                }
                                            })
                                        }
                                        for (const field of timing_fields) {
                                            data[index]["powerTiming"][field]?.forEach((revision, i) => {
                                                if (revision?.revisionID || revision?.revisionID === 0) {
                                                    data[index]["powerTiming"][field][i].revisionNote = RevisionNotes.envoys[index][revision?.revisionID]
                                                }
                                            })
                                        }
                                    }
                                    return Envoys.envoys
                                }
                            ),
                            {
                                path: 'SelectionMethods',
                                id: 'selectionmethods',
                                element: <SelectionMethodsPage />,
                                loader: () => Ages.selectionMethods,
                                handle: {
                                    breadcrumb: () => "Selection Methods"
                                }
                            }
                        ]
                    },

                    {
                        path: "FourPlanets",
                        element: <FourPlanetsPage />,
                        handle: {
                            breadcrumb: () => "Four Planets"
                        }
                    },
                    {
                        path: "FreewheelingFlares",
                        element: <FreewheelingPage />,
                        handle: {
                            breadcrumb: () => "Freewheeling Flares"
                        }
                    },
                    {
                        path: "CommonRewards",
                        element: <CommonRewardsPage />,
                        handle: {
                            breadcrumb: () => "Common Rewards"
                        }
                    },

                    itemPageRoute(
                        "Techs",
                        "Techs",
                        "techIndex",
                        <TechListPage />,
                        <IndividualTechPage />,
                        ({ params }) => Techs.technologies[params.techIndex],
                        () => {
                            const fields = ["body"]
                            const timing_fields = ["player", "phases"]
                            let data = Techs.technologies

                            for (const index of Object.keys(data)) {
                                for (const field of fields) {
                                    data[index][field]?.forEach((revision, i) => {
                                        if (revision?.revisionID || revision?.revisionID === 0) {
                                            data[index][field][i].revisionNote = RevisionNotes.technologies[index][revision?.revisionID]
                                        }
                                    })
                                }
                                for (const field of timing_fields) {
                                    data[index]["timing"][field]?.forEach((revision, i) => {
                                        if (revision?.revisionID || revision?.revisionID === 0) {
                                            data[index]["timing"][field][i].revisionNote = RevisionNotes.technologies[index][revision?.revisionID]
                                        }
                                    })
                                }
                            }
                            
                            return data
                        }
                    ),

                    itemPageRoute(
                        "Hazards",
                        "Hazards",
                        "hazardIndex",
                        <HazardListPage />,
                        <IndividualHazardPage />,
                        ({ params }) => Hazards.hazards[params.hazardIndex],
                        () => {
                            const fields = ["body", "barText"]
                            let data = Hazards.hazards

                            for (const index of Object.keys(data)) {
                                for (const field of fields) {
                                    data[index][field]?.forEach((revision, i) => {
                                        if (revision?.revisionID || revision?.revisionID === 0) {
                                            data[index][field][i].revisionNote = RevisionNotes.hazards[index][revision?.revisionID]
                                        }
                                    })
                                }
                            }

                            return data
                        }
                    ),

                    itemPageRoute(
                        "Stations",
                        "Space Stations",
                        "stationIndex",
                        <StationListPage />,
                        <IndividualStationPage />,
                        ({ params }) => Stations.stations[params.stationIndex],
                        () => {
                            const fields = ["body"]
                            const timing_fields = ["player", "phases"]
                            let data = Stations.stations

                            for (const index of Object.keys(data)) {
                                for (const field of fields) {
                                    data[index][field]?.forEach((revision, i) => {
                                        if (revision?.revisionID || revision?.revisionID === 0) {
                                            data[index][field][i].revisionNote = RevisionNotes.stations[index][revision?.revisionID]
                                        }
                                    })
                                }
                                for (const field of timing_fields) {
                                    data[index]["timing"][field]?.forEach((revision, i) => {
                                        if (revision?.revisionID || revision?.revisionID === 0) {
                                            data[index]["timing"][field][i].revisionNote = RevisionNotes.stations[index][revision?.revisionID]
                                        }
                                    })
                                }
                            }
                            return data
                        }
                    ),

                    itemPageRoute(
                        "Lux",
                        "Lux",
                        "luxIndex",
                        <LuxListPage />,
                        <IndividualLuxPage />,
                        ({ params }) => Lux.lux[params.luxIndex],
                        () => {
                            const fields = ["body"]
                            const timing_fields = ["player", "phases"]
                            let data = Lux.lux

                            for (const index of Object.keys(data)) {
                                for (const field of fields) {
                                    data[index][field]?.forEach((revision, i) => {
                                        if (revision?.revisionID || revision?.revisionID === 0) {
                                            data[index][field][i].revisionNote = RevisionNotes.lux[index][revision?.revisionID]
                                        }
                                    })
                                }
                                for (const field of timing_fields) {
                                    data[index]["timing"][field]?.forEach((revision, i) => {
                                        if (revision?.revisionID || revision?.revisionID === 0) {
                                            data[index]["timing"][field][i].revisionNote = RevisionNotes.lux[index][revision?.revisionID]
                                        }
                                    })
                                }
                            }
                            return data
                        }
                    ),

                    itemPageRoute(
                        "Moons",
                        "Moons",
                        "moonIndex",
                        <MoonListPage />,
                        <IndividualMoonPage />,
                        ({ params }) => Moons.moons[params.moonIndex],
                        () => {
                            const fields = ["body"]
                            const timing_fields = ["player", "phases"]
                            let data = Moons.moons

                            for (const index of Object.keys(data)) {
                                for (const field of fields) {
                                    data[index][field]?.forEach((revision, i) => {
                                        if (revision?.revisionID || revision?.revisionID === 0) {
                                            data[index][field][i].revisionNote = RevisionNotes.moons[index][revision?.revisionID]
                                        }
                                    })
                                }
                                for (const field of timing_fields) {
                                    data[index]["timing"][field]?.forEach((revision, i) => {
                                        if (revision?.revisionID || revision?.revisionID === 0) {
                                            data[index]["timing"][field][i].revisionNote = RevisionNotes.moons[index][revision?.revisionID]
                                        }
                                    })
                                }
                            }
                            return data
                        }
                    ),

                    itemPageRoute(
                        "Evolutions",
                        "Evolutions",
                        "evolutionIndex",
                        <EvolutionListPage />,
                        <IndividualEvolutionPage />,
                        ({ params }) => Evolutions.evolutions[params.evolutionIndex],
                        () => {
                            const fields = ["body"]
                            const timing_fields = ["player", "phases"]
                            let data = Evolutions.evolutions

                            for (const index of Object.keys(data)) {
                                for (const field of fields) {
                                    data[index][field]?.forEach((revision, i) => {
                                        if (revision?.revisionID || revision?.revisionID === 0) {
                                            data[index][field][i].revisionNote = RevisionNotes.evolutions[index][revision?.revisionID]
                                        }
                                    })
                                }
                                for (const field of timing_fields) {
                                    data[index]["timing"][field]?.forEach((revision, i) => {
                                        if (revision?.revisionID || revision?.revisionID === 0) {
                                            data[index]["timing"][field][i].revisionNote = RevisionNotes.evolutions[index][revision?.revisionID]
                                        }
                                    })
                                }
                            }
                            return data
                        }
                    ),

                    itemPageRoute(
                        "Objectives",
                        "Objectives",
                        "objectiveIndex",
                        <ObjectivesListPage />,
                        <IndividualObjectivePage />,
                        ({ params }) => Objectives.objectives[params.objectiveIndex],
                        () => Objectives.objectives
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
                        path: "Supershots",
                        element: <SuperShotsPage />,
                        handle: {
                            breadcrumb: () => "Super Shots"
                        }
                    },
                    {
                        path: "HandDraft",
                        element: <HandDraftPage />,
                        handle: {
                            breadcrumb: () => "Hand Draft"
                        }
                    },
                    {
                        path: "Contracts",
                        element: <ContractsPage />,
                        handle: {
                            breadcrumb: () => "Contracts"
                        }
                    },

                    itemPageRoute(
                        "SpecialShips",
                        "Special Ships",
                        "specialShipIndex",
                        <SpecialShipsPage />,
                        <IndividualSpecialShipPage />,
                        ({ params }) => SpecialShips.ships[params.specialShipIndex],
                        () => {
                            const fields = ["powerBody", "specialBody"]
                            const timing_fields = ["player", "phases"]
                            let data = SpecialShips.ships

                            for (const index of Object.keys(data)) {
                                for (const field of fields) {
                                    data[index][field]?.forEach((revision, i) => {
                                        if ((revision?.revisionID || revision?.revisionID === 0) && RevisionNotes.ships[index]) {
                                            data[index][field][i].revisionNote = RevisionNotes.ships[index][revision?.revisionID]
                                        }
                                    })
                                }
                                for (const parent_field of ["powerTiming", "specialTiming"]){
                                    for (const field of timing_fields) {
                                        data[index][parent_field][field]?.forEach((revision, i) => {
                                            if ((revision?.revisionID || revision?.revisionID === 0) && RevisionNotes.ships[index]) {
                                                data[index][parent_field][field][i].revisionNote = RevisionNotes.ships[index][revision?.revisionID]
                                            }
                                        })
                                    }
                                }
                            }

                            return data
                        }
                    ),
                    // {
                    //   path: "Anomalies",
                    //   element: <AnomaliesPage />,
                    //   handle: {
                    //     breadcrumb: () => "Anomalies"
                    //   }
                    // },
                    {
                        path: "AlienInfluencers",
                        element: <AlienInfluencersPage />,
                        handle: {
                            breadcrumb: () => "Alien Influencers"
                        }
                    },
                    {
                        path: "WinLimitation",
                        element: <WinLimitationPage />,
                        handle: {
                            breadcrumb: () => "Win Limitation"
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
            breadcrumb: () => "Throwback",
            title: () => "The Praw - Throwback"
        },
        loader: () => {
            let data = Aliens.aliens["221"]
            if (faq.aliens["221"]) {
                data.faq = faq.aliens["221"]
            } else {
                data.faq = []
            }
            return data
        },
        id: "throwback"
    },
    {
        path: "*",
        element: <Error404Page />,
        handle: {
            breadcrumb: () => "404"
        }
    }
]

// console.log(routes)