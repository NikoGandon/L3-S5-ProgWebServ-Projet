import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "../../../utils/axiosConf";

/**
 * @desc Affiche tous les serveurs dont l'utilisateur est membre
 *
 */

const ServeurBar = ({ onRevenirAccueil }) => {
  const [serveurs, setServeurs] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:3000/user/get-serveurs").then((res) => {
      setServeurs(res.data);
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
                navigateToServeur(serveur.id);
              }}
            >
              <img src={serveur.image} alt="serveur" />
              <div className="NomServeur">{serveur.nom}</div>
            </div>
          ))
        : null}
    </>
  );
};

export default ServeurBar;
