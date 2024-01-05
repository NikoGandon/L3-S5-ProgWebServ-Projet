import React from "react";
import Content from "./sectionHome/Content";
import ServeurBar from "./sectionHome/serveurBar";
import BarreLat from "./sectionHome/barreLat";
import Logout from "../authentification/logout"
import { ContextUserProvider } from "../../contexts/user.context";


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
      <ContextUserProvider>
        <h1>Bienvenue à toi !</h1>
        <div id="logout">
          <Logout />
        </div>
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
    </>
  );
};

export default Home;
