import React, { useState, useEffect, useContext } from "react";

import axios from "../../utils/axiosConf";
import { UserContext } from "../../contexts/user.context";


/**
 * @desc Affiche l'interface d'un serveur (liste des salons, liste des membres, liste des messages)
 */
const Serveur = () => {
  const { contexteID, contexteSalon } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("https://localhost:3000/serveur/", {
        params: {
          idSeveur: contexteID,
          idSalon: contexteSalon,
        },
      })
  }, [contexteID, contexteSalon]);

  return (
    <>
      <h1>Serveur</h1>
    </>
  );
};

export default Serveur;
