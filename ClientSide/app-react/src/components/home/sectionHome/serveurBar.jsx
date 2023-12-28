import React, { useState, useEffect } from "react";

import axios from "../../../utils/axiosConf";

/**
 * @desc Affiche tous les serveurs dont l'utilisateur est membre
 *
 */

const ServeurBar = () => {
  const [serveurs, setServeurs] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:3000/user/get-serveurs").then((res) => {
      setServeurs(res.data);
    });
  }, []);

  function navigateToServeur(idServeur) {}

  return (
    <>
      {serveurs
        ? serveurs.map((serveur) => (
            <div key={serveur.id} onClick={() => { navigateToServeur(serveur.id) }}>
              <img src={serveur.image} alt="serveur" />
              <div className="NomServeur">{serveur.nom}</div>
            </div>
          ))
        : null}
    </>
  );
};

export default ServeurBar;
