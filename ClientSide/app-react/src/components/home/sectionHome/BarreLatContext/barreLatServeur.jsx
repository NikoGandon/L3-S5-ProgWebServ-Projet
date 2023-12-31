import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../utils/axiosConf";
import { UserContext } from "../../../../contexts/user.context";

/**
 * @desc Récupère les salons d'un serveur
 * @param
 */

const barreLatServeur = ({ handleClick }) => {
  const { contexteUser, contexteID, updateContexte } = useContext(UserContext);
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:3000/serveur/get-salons", {
        params: {
          idServeur: contexteID,
        },
      })
      .then((res) => {
        setSalons(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {salons.length > 0
        ? salons.map((salon) => {
            return (
              <p
                key={salon.idSalon}
                onClick={() => {
                  handleClick("serveur", salon.idSalon);
                }}
              >
                {salon.nomSalon}
              </p>
            );
          })
        : null}
    </>
  );
};

export default barreLatServeur;
