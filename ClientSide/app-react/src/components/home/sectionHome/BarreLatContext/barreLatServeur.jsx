import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../utils/axiosConf";
import { UserContext } from "../../../../contexts/user.context";
import Serveur from "../../../serveur/serveur";

/**
 * @desc Récupère les salons d'un serveur
 * @param
 */


const barreLatServeur = ({ handleClick }) => {
  const { contexteUser, contexteID, contexteSalon, handleServeurSelect } =
    useContext(UserContext);
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:3000/serveur/get-salons", {
        params: {
          idServeur: contexteID,
        },
      })
      .then((res) => {
        setSalons(res.data.salons);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [contexteID]);

  useEffect(() => {
    if (salons.length > 0) {
      handleSelectSalon(salons[0].id);
    }
  }, []);

  const handleSelectSalon = (idSalon) => {
    handleServeurSelect(contexteID, idSalon);
  };

  return (
    <>
    <div id="nomDuServeurDiv">
      <h3 id="nomServeurTitle">Serveur</h3>
      </div>
      <button id="bouttonMembre">
          <img src="../../public/image/ajouterMembre.png" width="35px" height="35px"></img>
          <p id="textMembre">Ajouter</p>
         </button>
         <button id="bouttonParametres">
          <img src="../../public/image/Paramètres.png" width="35px" height="35px"></img>
          <p id="textParametres">Paramètres</p>
         </button>
         <p id="conversation">Salons</p>

      {salons.length > 0
        ? salons.map((salon) => {
            return (
              <div id="salonDesign">
              
              <p
                key={salon.id}
                onClick={() => {
                  handleSelectSalon(contexteID, salon.id);
                }}
              >
                ✎ {salon.nom}
              </p>
              </div>
            );
          })
        : "Aucun salon"}
    </>
  );
};

export default barreLatServeur;
