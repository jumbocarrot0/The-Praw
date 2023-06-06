import React, { 
  // createContext 
} from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

// import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
// import './App.scss';

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

//Pages
import Home from "./pages/HomePage";
import Combos from "./pages/CombosPage";
import AlienListPage from "./pages/Lists/AlienListPage";
import IndividualAlienPage from "./pages/IndividualAlienPage";
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

import Aliens from './dataFiles/aliens.json';

// Context
// export const appThemeContext = createContext("dark");

// const body = document.getElementById('body');
// body.setAttribute("data-bs-theme", appThemeContext._currentValue) // This is so damn jank


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      {/* <appThemeContext.Provider value={"dark"}> */}
        <div className="App">
          <Header />
          {/* Content */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Combos" element={<Combos />} />
              <Route path="/Aliens/:alienIndex" element={<IndividualAlienPage />} />
              <Route path="/Aliens" element={<AlienListPage />} />
              <Route path="/Variants" element={<VariantsListPage />} />
              <Route path="/Variants/Techs" element={<TechListPage />} />
              <Route path="/Variants/Techs/:techIndex" element={<IndividualTechPage />} />
              <Route path="/Variants/Hazards" element={<HazardListPage />} />
              <Route path="/Variants/Hazards/:hazardIndex" element={<IndividualHazardPage />} />
              <Route path="/Variants/Stations" element={<StationListPage />} />
              <Route path="/Variants/Stations/:stationIndex" element={<IndividualStationPage />} />
              <Route path="/Variants/Lux" element={<LuxListPage />} />
              <Route path="/Variants/Lux/:luxIndex" element={<IndividualLuxPage />} />
              <Route path="/Variants/Moons" element={<MoonListPage />} />
              <Route path="/Variants/Moons/:moonIndex" element={<IndividualMoonPage />} />
              <Route path="/Variants/Evolutions" element={<EvolutionListPage />} />
              <Route path="/Variants/Evolutions/:evolutionIndex" element={<IndividualEvolutionPage />} />
              <Route path="/Variants/Objectives" element={<ObjectivesListPage />} />
              <Route path="/Variants/Objectives/:objectiveIndex" element={<IndividualObjectivePage />} />
              <Route path="/Variants/RewardsDeck" element={<RewardsDeckPage />} />
              <Route path="/Variants/TeamMode" element={<TeamCosmicPage />} />
              <Route path="/Variants/Dials" element={<AllianceDialPage />} />
              <Route path="/Variants/ForeignAid" element={<ForeignAidPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      {/* </appThemeContext.Provider> */}
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
