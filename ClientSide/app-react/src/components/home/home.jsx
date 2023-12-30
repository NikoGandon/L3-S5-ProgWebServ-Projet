import React, { useState } from "react";
import Content from "./sectionHome/content";
import ServeurBar from "./sectionHome/serveurBar";
import BarreLat from "./sectionHome/barreLat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/**
 * @desc Affiche l'interface de l'utilisateur
 *      Si un serveur est sélectionné, affiche l'interface du serveur
 *      Si un groupe est sélectionné, affiche l'interface du groupe
 *      Si un message privé est sélectionné, affiche l'interface du message privé
 *      Sinon, affiche l'interface d'accueil
 *
 */
const Home = () => {

  const [context, setContext] = useState("accueil"); // ["accueil", "serveur", "groupe", "MP", "param"]
  const [contextID, setContextID] = useState(null); // [idServeur, idGroupe, idMP]

  function handleServeurSelec(id) {
    setContext("serveur");
    setServeurSelec(id);
  }

  function handleMPSelec(id) {
    setContext("MP");
    setMPSelec(id);
  }

  function handleGroupeSelec(id) {
    setContext("groupe");
    setContextID(id);
  }

  /**
   * @info Paramètre utilisateur ne peut s'atteindre que depuis l'accueil
   *
   */

  function handleParam(id) {
    setContext("param");
    setContextID(null);
  }

  const handleRevenirAccueil = () => {
    setContext("accueil");
    setContextID(null);
  };

  return (
    <>
      <h1>Bienvenue à toi !</h1>
      <div id="barreServeur">
        <ServeurBar
          handleServeurSelec={handleServeurSelec}
          handleRevenirAccueil={handleRevenirAccueil}
        />
      </div>
      <div id="barreLaterale">
        <BarreLat
          {...{
            context: context,
          }}
        />
      </div>
      <div id="content">
        <Content
          {...{
            typeContent: context,
            IDContent: contextID,
          }}
          onChangeBarreLat={handleParam}
        />
      </div>
    </>
  );
};

export default Home;
