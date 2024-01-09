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
      <div>
        <p>Username: {profil.username}</p>
      </div>
      <div>
        <p>Email: {profil.email}</p>
      </div>
      <div>
        <p>Bio: {profil.bio}</p>
      </div>
      <div>
        <p>Photo de Profil : </p>
        <img src={profil.lienPP} width="35px" height="35px"></img>
      </div>
    </>
  );
}
export default Profil;
