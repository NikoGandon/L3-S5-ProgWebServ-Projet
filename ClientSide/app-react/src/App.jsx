import React from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import "./App.css";

import HomeUnconnected from "./components/home/homeUnconnected";
import Home from "./components/Home/home";
import Authentication from "./components/authentification/authentication";
import Parametre from "./components/parametre/parametre";
import LoginSuccess from "./components/authentification/loginSuccess";
import Groupe from "./components/groupe/groupe";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log("token stocké  : " + token);
  let estConnecte = token !== null;
  if (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 < new Date().getTime()) {
      localStorage.removeItem("token");
      setToken(null);
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={estConnecte ? <Home /> : <HomeUnconnected connectionState='false' />} />
        <Route path="/accueil" element={<Navigate to="/" />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/parametre" element={<Parametre />} />
        <Route path="/auth/login/success" element={<LoginSuccess />} />
        <Route path="/groupe" element={<Groupe />} />
      </Routes>
    </Router>
  )
}
export default App;
