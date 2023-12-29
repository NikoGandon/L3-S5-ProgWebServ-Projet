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
  const [serveurSelec, setServeurSelec] = useState(null);
  const [MPSelec, setMPSelec] = useState(null);
  const [groupeSelec, setGroupeSelec] = useState(null);
  const [param, setParam] = useState(false);

  const [accueil, setAccueil] = useState(true);

  function handleServeurSelec(id) {
    setServeurSelec(id);
    setMPSelec(null);
    setGroupeSelec(null);
    setAccueil(false);
  }

  function handleMPSelec(id) {
    setMPSelec(id);
    setServeurSelec(null);
    setGroupeSelec(null);
    setAccueil(false);
  }

  function handleGroupeSelec(id) {
    setGroupeSelec(id);
    setMPSelec(null);
    setServeurSelec(null);
    setAccueil(false);
  }

  /**
   * @info Paramètre utilisateur ne peut s'atteindre que depuis l'accueil
   *
   */

  function handleParam(id) {
    setGroupeSelec(id);
    setMPSelec(null);
    setServeurSelec(null);
    setAccueil(false);
  }

  const handleRevenirAccueil = () => {
    setServeurSelec(null);
    setAccueil(true);
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
            context: serveurSelec ? "serveur" : param ? "param" : "accueil",
          }}
        />
      </div>
      <div id="content">
        <Content
          {...{
            typeContent: serveurSelec
              ? "serveur"
              : MPSelec
              ? "MP"
              : groupeSelec
              ? "groupe"
              : "accueil",
            IDContent: serveurSelec
              ? serveurSelec
              : MPSelec
              ? MPSelec
              : groupeSelec
              ? groupeSelec
              : null,
          }}
          onChangeBarreLat={handleParam}
        />
      </div>
    </>
  );
};

export default Home;
