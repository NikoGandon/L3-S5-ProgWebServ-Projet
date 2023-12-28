import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "./utils/axiosConf";

import "./App.css";

import HomeUnconnected from "./components/home/homeUnconnected";
import Home from "./components/Home/home";
import Authentication from "./components/authentification/authentication";
import Parametre from "./components/parametre/parametre";
import LoginSuccess from "./components/authentification/loginSuccess";
import Groupe from "./components/groupe/groupe";

function App() {
  const [estConnecte, setEstConnecte] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        console.log("Vérification de l'authentification...");
        const response = await axios.get(
          "https://localhost:3000/auth/check-auth"
          );
          
        console.log("fin du fetch...");

        if (response.data.authenticated) {
          setEstConnecte(true);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification :",
          error
        );
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          exact
          element={
            estConnecte ? <Home /> : <HomeUnconnected connectionState="false" />
          }
        />
        <Route path="/accueil" element={<Navigate to="/" />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/auth/success" element={<LoginSuccess />} />
        <Route path="/parametre" element={<Parametre />} />
        <Route path="/auth/login/success" element={<LoginSuccess />} />
        <Route path="/groupe" element={<Groupe />} />
      </Routes>
    </Router>
  );
}
export default App;
