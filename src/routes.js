//Pages
import React from "react";
import { Await, defer, redirect } from "react-router-dom"
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Layout from "./components/Layout";
// import Loading from "./components/Loading";

import Home from "./pages/HomePage";
import Results from "./pages/ResultsPage";
import Combos from "./pages/CombosPage";
import CombosSubmit from "./pages/CombosSubmitPage";
import HouseRulesPage from "./pages/HouseRulesPage";
import SelectionPage from "./pages/SelectionPage";
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

import { getAlien, getAllAliens } from "./supabaseAPI/getAlien"

// const AlienBreadcrumb = ({ match }) => Aliens.aliens[match.params.alienIndex].original.name;

const itemPageBreadcrumb = (data) => data?.original?.name ?? '???'

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
        loader: () => defer({ aliens: getAllAliens() }),
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
              if (params.alienIndex.match(/ /)){
                return redirect(`../${params.alienIndex.replaceAll(/ /g, '_')}`)
              }
              const alienDataPromise = getAlien(params.alienIndex)
              return defer({ alien: alienDataPromise })
            },
            id: "alienIndex",
            handle: {
              breadcrumb: (data) => (
                <React.Suspense fallback={null}>
                  <Await
                    resolve={data.alien}
                    errorElement={
                      <p>Error loading alien!</p>
                    }
                  >
                    {(alien) => alien.original.name}
                  </Await>
                </React.Suspense>
              ),
              title: (data) => (
                <React.Suspense fallback={null}>
                  <Await
                    resolve={data.alien}
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
                          <title>The Praw - {alien.original.name}</title>
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

              {
                path: 'Ages',
                id: 'ages',
                element: <AgesPage />,
                loader: () => {return Ages},
                handle: {
                  breadcrumb: () => "Ages"
                },
              },
              // itemPageRoute(
              //   "Ages",
              //   "Ages",
              //   "ageIndex",
              //   <AgesPage />,
              //   null,
              //   ({ params }) => {
              //     if(params.ageIndex.match(/^\d+$/)){
              //       return Ages.ages[params.ageIndex]
              //     } else{
              //       for(const index in Ages.ages){
              //         if ((Ages.ages[index].name + Ages.ages[index].name).replaceAll(' ', '_') === params.ageIndex){
              //           return Ages.ages[index]
              //         }
              //       }
              //       return null
              //     }
              //   },
              //   () => {return Ages}
              // ),
              itemPageRoute(
                "MasterCards",
                "Master Cards",
                "masterIndex",
                <MasterPage />,
                <IndividualMasterPage />,
                ({ params }) => {
                  if(params.masterIndex.match(/^\d+$/)){
                    return Ages.master[params.masterIndex]
                  } else{
                    for(const index in Ages.master){
                      if ((Ages.master[index].original.name).replaceAll(' ', '_') === params.masterIndex){
                        return Ages.master[index]
                      }
                    }
                    return null
                  }
                },
                () => Ages.master
              ),
              itemPageRoute(
                "WrenchCards",
                "Wrench Cards",
                "wrenchIndex",
                <WrenchPage />,
                <IndividualWrenchPage />,
                ({ params }) => {
                  if(params.wrenchIndex.match(/^\d+$/)){
                    return Wrenches.wrench[params.wrenchIndex]
                  } else{
                    for(const index in Wrenches.wrench){
                      if ((Wrenches.wrench[index].original.name).replaceAll(' ', '_') === params.wrenchIndex){
                        return Wrenches.wrench[index]
                      }
                    }
                    return null
                  }
                },
                () => Wrenches.wrench
              ),
              itemPageRoute(
                "PrivilegeCards",
                "Privilege Cards",
                "privilegeIndex",
                <PrivilegePage />,
                <IndividualPrivilegePage />,
                ({ params }) => {
                  if(params.privilegeIndex.match(/^\d+$/)){
                    return Privileges.privilege[params.privilegeIndex]
                  } else{
                    for(const index in Privileges.privilege){
                      if ((Privileges.privilege[index].original.name).replaceAll(' ', '_') === params.privilegeIndex){
                        return Privileges.privilege[index]
                      }
                    }
                    return null
                  }
                },
                () => Privileges.privilege
              ),
              itemPageRoute(
                "Envoys",
                "Envoys",
                "envoyIndex",
                <EnvoysPage />,
                <IndividualEnvoyPage />,
                ({ params }) => {
                  if(params.envoyIndex.match(/^\d+$/)){
                    return Envoys.envoys[params.envoyIndex]
                  } else{
                    for(const index in Envoys.envoys){
                      if ((Envoys.envoys[index].original.name).replaceAll(' ', '_') === params.envoyIndex){
                        return Envoys.envoys[index]
                      }
                    }
                    return null
                  }
                },
                () => Envoys.envoys
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
            ({ params }) => {
              if(params.techIndex.match(/^\d+$/)){
                return Techs.technologies[params.techIndex]
              } else{
                for(const index in Techs.technologies){
                  if ((Techs.technologies[index].original.name).replaceAll(' ', '_') === params.techIndex){
                    return Techs.technologies[index]
                  }
                }
                return null
              }
            },
            () => Techs.technologies
          ),

          itemPageRoute(
            "Hazards",
            "Hazards",
            "hazardIndex",
            <HazardListPage />,
            <IndividualHazardPage />,
            ({ params }) => {
              if(params.hazardIndex.match(/^\d+$/)){
                return Hazards.hazards[params.hazardIndex]
              } else{
                for(const index in Hazards.hazards){
                  if ((Hazards.hazards[index].original.name).replaceAll(' ', '_') === params.hazardIndex){
                    return Hazards.hazards[index]
                  }
                }
                return null
              }
            },
            () => Hazards.hazards
          ),

          itemPageRoute(
            "Stations",
            "Space Stations",
            "stationIndex",
            <StationListPage />,
            <IndividualStationPage />,
            ({ params }) => {
              if(params.stationIndex.match(/^\d+$/)){
                return Stations.stations[params.stationIndex]
              } else if (params.stationIndex === "Observation_Platform_2"){
                console.log(params.stationIndex)
                return Stations.stations['13']
              } else{
                console.log(params.stationIndex)
                for(const index in Stations.stations){
                  if ((Stations.stations[index].original.name).replaceAll(' ', '_') === params.stationIndex){
                    return Stations.stations[index]
                  }
                }
                return null
              }
            },
            () => Stations.stations
          ),

          itemPageRoute(
            "Lux",
            "Lux",
            "luxIndex",
            <LuxListPage />,
            <IndividualLuxPage />,
            ({ params }) => {
              if(params.luxIndex.match(/^\d+$/)){
                return Lux.lux[params.luxIndex]
              } else{
                for(const index in Lux.lux){
                  if ((Lux.lux[index].original.name).replaceAll(' ', '_') === params.luxIndex){
                    return Lux.lux[index]
                  }
                }
                return null
              }
            },
            () => Lux.lux
          ),

          itemPageRoute(
            "Moons",
            "Moons",
            "moonIndex",
            <MoonListPage />,
            <IndividualMoonPage />,
            ({ params }) => {
              if(params.moonIndex.match(/^\d+$/)){
                return Moons.moons[params.moonIndex]
              } else{
                for(const index in Moons.moons){
                  if ((Moons.moons[index].original.name).replaceAll(' ', '_') === params.moonIndex){
                    return Moons.moons[index]
                  }
                }
                return null
              }
            },
            () => Moons.moons
          ),

          itemPageRoute(
            "Evolutions",
            "Evolutions",
            "evolutionIndex",
            <EvolutionListPage />,
            <IndividualEvolutionPage />,
            ({ params }) => {
              if(params.evolutionIndex.match(/^\d+$/)){
                return Evolutions.evolutions[params.evolutionIndex]
              } else if(params.evolutionIndex === "Archaeology"){
                return redirect("../Archæology");
              } else{
                for(const index in Evolutions.evolutions){
                  if ((Evolutions.evolutions[index].original.name).replaceAll(' ', '_') === params.evolutionIndex){
                    return Evolutions.evolutions[index]
                  }
                }
                return null
              }
            },
            () => Evolutions.evolutions
          ),

          itemPageRoute(
            "Objectives",
            "Objectives",
            "objectiveIndex",
            <ObjectivesListPage />,
            <IndividualObjectivePage />,
            ({ params }) => {
              if(params.objectiveIndex.match(/^\d+$/)){
                return Objectives.objectives[params.objectiveIndex]
              } else{
                for(const index in Objectives.objectives){
                  if ((Objectives.objectives[index].original.name).replaceAll(' ', '_') === params.objectiveIndex){
                    return Objectives.objectives[index]
                  }
                }
                return null
              }
            },
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
            ({ params }) => {
              if(params.specialShipIndex.match(/^\d+$/)){
                return SpecialShips.ships[params.specialShipIndex]
              } else{
                for(const index in SpecialShips.ships){
                  if ((SpecialShips.ships[index].original.name).replaceAll(' ', '_') === params.specialShipIndex){
                    return SpecialShips.ships[index]
                  }
                }
                return null
              }
            },
            () => SpecialShips.ships
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
    path: "Aliens",
    handle: {
      breadcrumb: () => "Throwback",
      title: () => "The Praw - Throwback"
    },
    children: [
      {
        path: "221"
      },
      {
        path: "Throwback"
      }
    ],
    loader: () => {
      const alienDataPromise = getAlien("221")
      return defer({ alien: alienDataPromise })
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