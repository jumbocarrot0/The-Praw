import React, {
  // createContext 
} from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, createRoutesFromElements, Routes, Route, RouterProvider } from "react-router-dom"
import './index.css';
import reportWebVitals from './reportWebVitals';

// import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

// Components
import Header from "./components/Header"
import Footer from "./components/Footer"
// import Breadcrumbs from "./components/Breadcrumbs"

//Routes
import {routes} from "./routes"


import Aliens from './dataFiles/originalAliens.json';
import revisedAlienData from './dataFiles/revisedAliens.json';

// Reactstrap
import { BreadcrumbItem } from 'reactstrap';

Aliens.aliens.sort(function (a, b) {
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

revisedAlienData.aliens.sort(function (a, b) {
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

const router = createHashRouter(routes
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
