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


import Aliens from './dataFiles/aliens.json';

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
