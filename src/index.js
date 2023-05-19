import React, { createContext } from 'react';
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

// Context
export const appThemeContext = createContext("dark");

const body = document.getElementById('body');
body.setAttribute("data-bs-theme", appThemeContext._currentValue) // This is so damn jank

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <div className="App">
        <appThemeContext.Provider value={"dark"}>
          <Header />
          {/* Content */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Combos" element={<Combos />} />
              <Route path="/Aliens/:alienIndex" element={<IndividualAlienPage />} />
              <Route path="/Aliens" element={<AlienListPage />} />
            </Routes>
          </main>
          <Footer />
        </appThemeContext.Provider>
      </div>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
