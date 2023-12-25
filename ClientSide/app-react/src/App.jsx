import React from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./App.css";

import HomeUnconnected from "./components/home/homeUnconnected";
import Home from "./components/Home/home";
import Authentication from "./components/authentification/authentication";
import Login from "./components/authentification/login";
import Register from "./components/authentification/regiter";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log("token stocké  : " + token);
  const estConnecte = token !== null;
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
        <Route path="/accueil" element={estConnecte ? <Home /> : <HomeUnconnected connectionState='false' />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </Router>
  )
}
export default App;
