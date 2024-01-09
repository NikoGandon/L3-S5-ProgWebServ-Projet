import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "./utils/axiosConf";
import { io } from "socket.io-client";

const socket = io("https://localhost:3000", {
  transports: ["websocket"],
  rejectUnauthorized: false,
});

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.emit("connection");

import "./App.css";

import HomeUnconnected from "./components/home/homeUnconnected";
import Home from "./components/home/home";

import  ContextPopUpProvider  from "./contexts/popup.context";
import PopUpContainer from "./components/containers/popup.container";

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
            estConnecte ? (
              <ContextPopUpProvider>
                <PopUpContainer />
                <Home />
              </ContextPopUpProvider>
            ) : (
              <HomeUnconnected connectionState="false" />
            )
          }
        />
        <Route path="/accueil" element={<Navigate to="/" />} />
        {/*<Route path="/auth" element={<Authentication />} />
        <Route path="/auth/success" element={<LoginSuccess />} />
        <Route path="/parametre" element={<Parametre />} />
        <Route path="/auth/login/success" element={<LoginSuccess />} />
        <Route path="/groupe" element={<Groupe />} />*/}
      </Routes>
    </Router>
  );
}
export default App;
