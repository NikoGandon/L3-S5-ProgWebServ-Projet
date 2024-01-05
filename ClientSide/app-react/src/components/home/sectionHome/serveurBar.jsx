import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "../../../utils/axiosConf";
import { UserContext } from "../../../contexts/user.context";

import CreateServeur from "../../serveur/createServeur";

/**
 * @desc Affiche tous les serveurs dont l'utilisateur est membre
 *
 */

const ServeurBar = ({ onRevenirAccueil }) => {
  const { contexteUser, contexteID, updateContexte, handleServeurSelect } =
    useContext(UserContext);
  const [serveurs, setServeurs] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:3000/user/get-serveurs")
      .then((res) => {
        setServeurs(res.data.Serveurs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="button_home" onClick={onRevenirAccueil}>
        <img src="../../../images/plus.png" alt="Home" />
      </div>
      {serveurs.length > 0
        ? serveurs.map((serveur) => (
            <div
              key={serveur.id}
              onClick={() => {
                handleServeurSelect(serveur.id);
              }}
            >
              <p>{serveur.id}</p>
              <img src={serveur.imgLink} alt={serveur.nomServeur} />
              <div className="NomServeur">Coucou, {serveur.nomServeur}</div>
            </div>
          ))
        : "pas de serveur"}
      <div className="createServeur">
        <CreateServeur />
      </div>
    </>
  );
};

export default ServeurBar;
