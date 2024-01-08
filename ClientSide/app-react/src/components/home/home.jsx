import React from "react";
import Content from "./sectionHome/Content";
import ServeurBar from "./sectionHome/serveurBar";
import BarreLat from "./sectionHome/barreLat";
import Logout from "../authentification/logout";

import { ContextUserProvider } from "../../contexts/user.context";

import "../../../src/cssGeneral.css";

/**
 * @desc Affiche l'interface de l'utilisateur
 *      Si un serveur est sélectionné, affiche l'interface du serveur
 *      Si un groupe est sélectionné, affiche l'interface du groupe
 *      Si un message privé est sélectionné, affiche l'interface du message privé
 *      Sinon, affiche l'interface d'accueil
 *
 */
const Home = () => {
  return (
    <>
      <div className="grid">
        <ContextUserProvider>
          <div id="barreServeur">
            <ServeurBar />
          </div>
          <div id="barreLaterale">
            <BarreLat />
          </div>
          <div id="content">
            <Content />
          </div>
        </ContextUserProvider>
      </div>
    </>
  );
};

export default Home;
