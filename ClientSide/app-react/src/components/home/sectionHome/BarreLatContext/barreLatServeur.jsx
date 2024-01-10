import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../utils/axiosConf";
import { UserContext } from "../../../../contexts/user.context";
import CreateSalon from "../../../salon/createSalon";
import AddMembre from "../../../serveur/addMembreServ";

/**
 * @desc Récupère les salons d'un serveur
 * @param
 */


const barreLatServeur = ({ handleClick }) => {
  const { contexteUser, contexteID, contexteSalon, handleServeurSelect } =
    useContext(UserContext);
  const [salons, setSalons] = useState([]);
  const idServ = contexteID;

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
      <div><AddMembre idServ={idServ}/></div>
         <button id="bouttonParametres">
          <img src="../../public/image/Paramètres.png" width="35px" height="35px"></img>
          <p id="textParametres">Paramètres</p>
         </button>
         <p id="conversation">Salons</p>
         <CreateSalon/>

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
        : <p>Aucun salon ✘</p>}
    </>
  );
};

export default barreLatServeur;
