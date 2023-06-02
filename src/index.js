import React, { 
  // createContext 
} from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom"
import './index.css';
import reportWebVitals from './reportWebVitals';

// import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import './App.scss'

// Components
import Header from "./components/Header"
import Footer from "./components/Footer"

//Pages
import Home from "./pages/HomePage"
import Combos from "./pages/CombosPage"
import AlienListPage from "./pages/AlienListPage"
import IndividualAlienPage from "./pages/IndividualAlienPage"
import VariantsListPage from './pages/VariantsListPage';
import TechListPage from './pages/TechListPage';
import IndividualTechPage from "./pages/IndividualTechPage"
import HazardListPage from './pages/HazardListPage';
import IndividualHazardPage from "./pages/IndividualHazardPage"
import StationListPage from './pages/StationListPage';
import IndividualStationPage from "./pages/IndividualStationPage"

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
              <Route path="/Variants/Tech" element={<TechListPage />} />
              <Route path="/Variants/Tech/:techIndex" element={<IndividualTechPage />} />
              <Route path="/Variants/Hazard" element={<HazardListPage />} />
              <Route path="/Variants/Hazard/:hazardIndex" element={<IndividualHazardPage />} />
              <Route path="/Variants/Stations" element={<StationListPage />} />
              <Route path="/Variants/Stations/:stationIndex" element={<IndividualStationPage />} />
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
