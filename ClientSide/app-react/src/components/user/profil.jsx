import React, { useEffect, useState, useContext } from "react";
import PopUp from "../pop-up/pop-up.model";
import axios from "../../utils/axiosConf";

const Profil = () => {
  const [profil, setProfil] = useState({}); // Vous attendez un objet, pas un tableau

  const fetchUserProfile = () => {
    axios
      .get("https://localhost:3000/user/information") // Endpoint pour récupérer les informations de l'utilisateur
      .then((res) => {
        setProfil(res.data.infoUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

}
export default Profil;
