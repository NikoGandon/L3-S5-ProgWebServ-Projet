import React, { useState } from "react";

import   BarreLatHome   from "./BarreLatContext/barreLatHome";
//import { barreLatServeur } from "./BarreLatContext/barreLatServeur";
//import { barreLatParam } from "./BarreLatContext/barreLatParam"

/**
 * @desc Affiche la barre latérale - peut changer en fonction du contexte
 * @param {*} context Chaque composant parent peut envoyer un contexte différent
 *                    Par exemple, le composant Home envoie le contexte "home"
 *                    Le composant Serveur envoie le contexte "serveur"
 *                    Le composant Parametre envoie le contexte "Param"
 * @returns
 */
const BarreLat = ({ context }) => {
  const [contexte, setContexte] = useState(context);

  let element = null;

  switch (contexte) {
    case "accueil":
      element = <BarreLatHome />;
      break;
    case "serveur":
      element = <p>{context}</p>;
      break;
    case "param":
      element = <p>{context}</p>;
      break;
    default:
  }

  return (
    <>
      {element}
    </>
  );
};

export default BarreLat;
