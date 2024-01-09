import React, { useContext, useState } from "react";

import BarreLatHome from "./BarreLatContext/barreLatHome";
import BarreLatServeur from "./BarreLatContext/barreLatServeur";
//import { barreLatParam } from "./BarreLatContext/barreLatParam"

import { UserContext } from "../../../contexts/user.context";

/**
 * @desc Affiche la barre latérale - peut changer en fonction du contexte
 * @returns
 */
const BarreLat = () => {
  const { contexteUser, handleGroupeSelect, handleServeurSelect } = useContext(UserContext);
  
  let element = null;

  const handleClickServeur = (idServeur, idSalon = null) => {
    handleServeurSelect(idServeur, idSalon);
  };

  const handleClickGroupe = (idGroupe) => {
    handleGroupeSelect(idGroupe);
  };
  

  switch (contexteUser) {
    case "accueil":
      element = <BarreLatHome handleClick={handleClickGroupe}/>;
      break;
    case "serveur":
      element = <BarreLatServeur handleClick={handleClickServeur}/>;
      break;
    case "amis":
      element = <BarreLatHome handleClick={handleClickGroupe}/>;
      break;
    case "param":
      element = <BarreLatHome handleClick={handleClickGroupe}/>;
      break;
    default:
  }

  return <>{element}</>;
};

export default BarreLat;
