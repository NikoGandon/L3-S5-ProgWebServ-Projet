import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "../../utils/axiosConf";
import AddFriend from "../user/ajoutAmi";

import { usePopup } from "../../contexts/popup.context";

import AdminPanel from "./administration";

const Accueil = () => {
  const { handleParam, handleProfil, handleAdminPanel } = useContext(UserContext);
  const [admin, setAdmin] = useState(false);
  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    axios.get("https://localhost:3000/Administrateur/isAdmin").then((res) => {
      if (res.data.estAdmin) {
        setAdmin(true);
      }
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.get("https://localhost:3000/auth/logout");

      if (response.status === 200) {
        console.log("Vous vous êtes déconnecté");
        window.location.reload();
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <>
      <div id="zoneAccueil">
        <div id="arrierePlanFlou"></div>
        <div id="contenuAccueil">
          <h3>Bienvenue sur DLIKE</h3>
          <p id="message_bienvenue">Amuse-toi bien !</p>
          <button id="deconnexion" onClick={handleSubmit}>
            Déconnexion
          </button>
          {admin ? (
            <div className="button_param" onClick={() => handleAdminPanel()}>
              <button alt="Admin" id="admin">
                Pannel administrateur
              </button>
            </div>
          ) : null}
            <div className="button_param" onClick={() => handleParam()}>
            <p alt="Param" id="parametres">
              Paramètres
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accueil;
