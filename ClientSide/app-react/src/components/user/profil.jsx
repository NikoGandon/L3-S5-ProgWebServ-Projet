import React, { useEffect, useState, useContext } from "react";
import PopUp from "../pop-up/pop-up.model";
import axios from "../../utils/axiosConf";

const Profil = () => {
  const [profil, setProfil] = useState({}); 

  const fetchUserProfile = () => {
    axios
      .get("https://localhost:3000/user")
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
  return (
    <>
      <div id="zoneamis">
        <div id="arrierePlanFlou">
          <div id="contenuAmis">
            <h2>Votre Profile</h2>
        <img src={profil.lienPP} width="35px" height="35px"></img>
        <div id="backgroundInfo">
        <p>Nom d'utilisateur: {profil.username}</p>
        <p>Email: {profil.email}</p>
        <p>Biographie: {profil.bio}</p>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}
export default Profil;
