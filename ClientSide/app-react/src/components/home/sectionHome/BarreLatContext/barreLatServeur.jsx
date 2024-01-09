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
      <img src="../../public/image/ajouterMembre.png" width="50px" height="50px"></img>
      <h3 id="nomServeurTitle">Serveur</h3>
      <img src="../../public/image/Paramètres.png" width="50px" height="50px"></img>
      </div>
      <div id="barre"></div>

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
                {salon.nom}
              </p>
              </div>
            );
          })
        : "Aucun salon"}
    </>
  );
};

export default barreLatServeur;
