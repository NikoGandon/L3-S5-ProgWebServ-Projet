import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../utils/axiosConf";
import { UserContext } from "../../../../contexts/user.context";

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
      {salons.length > 0
        ? salons.map((salon) => {
            return (
              <p
                key={salon.id}
                onClick={() => {
                  handleSelectSalon(contexteID, salon.id);
                }}
              >
                {salon.nom}
              </p>
            );
          })
        : "il n'y a pas de salon"}
    </>
  );
};

export default barreLatServeur;
