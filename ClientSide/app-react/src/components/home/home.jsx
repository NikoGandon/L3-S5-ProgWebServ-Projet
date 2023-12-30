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
  const [contexte, setContexte] = useState({
    contexteUser: "accueil", // accueil, serveur, groupe, MP, profil, param
    contexteID: null,        // ID du serveur, groupe, MP
  });

  function handleServeurSelec(id) {
    setContexte(["serveur", id]);
  }

  function handleMPSelec(id) {
    setContexte(["MP", id]);
  }

  function handleGroupeSelec(id) {
    setContexte(["groupe", id]);
  }

  /**
   * @info Paramètre utilisateur ne peut s'atteindre que depuis l'accueil
   *
   */

  function handleParam() {
    setContexte(["param", null]);
  }

  const handleRevenirAccueil = () => {
    setContexte(["accueil", null]);
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
            context: contexte.contexteUser,
          }}
        />
      </div>
      <div id="content">
        <Content {...{ contexte }} onChangeBarreLat={handleParam} />
      </div>
    </>
  );
};

export default Home;
