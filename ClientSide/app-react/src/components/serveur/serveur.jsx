import React, { useState, useEffect, useContext } from "react";

import axios from "../../utils/axiosConf";
import { UserContext } from "../../contexts/user.context";


/**
 * @desc Affiche l'interface d'un serveur (liste des salons, liste des membres, liste des messages)
 */
const Serveur = () => {
  const { contexteID } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("https://localhost:3000/serveur/", {
        params: {
          id: contexteID,
        },
      })
      .then((res) => {});
  }, []);

  return (
    <>
      <h1>Serveur</h1>
    </>
  );
};

export default Serveur;
