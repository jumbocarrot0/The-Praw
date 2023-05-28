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

import Aliens from './dataFiles/originalAliens.json';
import revisedAlienData from './dataFiles/revisedAliens.json';

Aliens.aliens.sort(function(a, b) {
  const expansions = ["Base Set", "Cosmic Incursion", "Cosmic Conflict", "Cosmic Alliance", "Cosmic Storm", "Cosmic Dominion", "Cosmic Eons", "42nd Anniversary Edition", "Cosmic Odyssey"]
  // console.log(a.expansion)
  if (expansions.findIndex((e) => e === a.expansion) < expansions.findIndex((e) => e === b.expansion)) {
    return -1;
  }
  else if (expansions.findIndex((e) => e === a.expansion) > expansions.findIndex((e) => e === b.expansion)) {
    return 1;
  } else {
    if (a.name < b.name) {
      return -1;
    }
    else if (a.name > b.name) {
      return 1;
    }
  }
  return 0;
})

revisedAlienData.aliens.sort(function(a, b) {
  const expansions = ["Base Set", "Cosmic Incursion", "Cosmic Conflict", "Cosmic Alliance", "Cosmic Storm", "Cosmic Dominion", "Cosmic Eons", "42nd Anniversary Edition", "Cosmic Odyssey"]
  // console.log(a.expansion)
  if (expansions.findIndex((e) => e === a.expansion) < expansions.findIndex((e) => e === b.expansion)) {
    return -1;
  }
  else if (expansions.findIndex((e) => e === a.expansion) > expansions.findIndex((e) => e === b.expansion)) {
    return 1;
  } else {
    if (a.name < b.name) {
      return -1;
    }
    else if (a.name > b.name) {
      return 1;
    }
  }
  return 0;
})

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
