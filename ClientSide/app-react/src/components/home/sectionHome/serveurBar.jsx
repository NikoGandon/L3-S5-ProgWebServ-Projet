import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "../../../utils/axiosConf";
import { UserContext } from "../../../contexts/user.context";

import CreateServeur from "../../serveur/createServeur";

/**
 * @desc Affiche tous les serveurs dont l'utilisateur est membre
 *
 */

const ServeurBar = () => {
  const { handleServeurSelect, handleRevenirAccueil } = useContext(UserContext);
  const [serveurs, setServeurs] = useState([]);

  const ajouterServeur = () => {
    axios
      .get("https://localhost:3000/user/get-serveurs")
      .then((res) => {
        setServeurs(res.data.Serveurs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ajouterServeur();
  }, []);

  return (
    <>
      <div
        className="button_home"
        onClick={() => {
          handleRevenirAccueil();
        }}
      >
        <img
          id="logo"
          src="../../public/image/discord.png"
          width="80px"
          height="80px"
        />
        <div id="barre"></div>
      </div>
      {serveurs.length > 0
        ? serveurs.map((serveur) => (
            <div
              key={serveur.id}
              onClick={() => {
                handleServeurSelect(serveur.id);
              }}
            >
              <div id="divBackgroundServeur">

              <p>{serveur.nomServeur} </p>
              <img
                id="logoServeur"
                src="../../public/image/serverLogo.png" //{serveur.imgLink}
                alt={serveur.nomServeur}
              />
              </div>
            </div>
          ))
        : "pas de serveur"}
      <div className="createServeur">
        <CreateServeur ajouterServeur={ajouterServeur} />
      </div>
    </>
  );
};

export default ServeurBar;
