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
  const { contexteUser, contexteID, updateContexte } = useContext(UserContext);
  
  let element = null;

  const handleClick = (nameContext, IDContext) => {
    updateContexte({ contexteUser: nameContext, contexteID: IDContext });
  };

  switch (contexteUser) {
    case "accueil":
      element = <BarreLatHome handleClick={handleClick}/>;
      break;
    case "serveur":
      element = <BarreLatServeur handleClick={handleClick}/>;
      break;
    case "param":
      element = <p>{contexteUser}</p>;
      break;
    default:
  }

  return <>{element}</>;
};

export default BarreLat;
