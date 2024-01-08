import React , {useContext, useEffect, useState} from "react";
import { UserContext} from "../../contexts/user.context";
import axios from "../../utils/axiosConf";

const Accueil = () => {
  const { handleParam, handleProfil } = useContext(UserContext);

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

  const { infoUser, setInfoUser }  = useState();

  useEffect (() => {
      try {
        const response = axios.get("https://localhost:3000/user/me");
        
        if (response.status === 200) {
          console.log("me :", response.data);
          setInfoUser(response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
  }); // Add a closing parenthesis here

  return (
    <>
      <div id="zoneAccueil">
        <div id="arrierePlanFlou"></div>
        <div id="contenuAccueil">
          <div id="messages">
            <h3>Bienvenue sur discord</h3>
            <p id="message_bienvenue">Amuse-toi bien mon ami </p>  
          </div>
          <div className="button_param" onClick={() => handleParam()}>      
            <div className="button_profil" onClick={()=>{handleProfil()}}>
              <p id="username">PLACEHOLDER InfoUser.username</p> {/* {infoUser.username} */}
              <img id="lienPP" src="../../public/image/serverLogo.png" alt="Profil" /> {/* {infoUser.lienPP} https://localhost:3000/fichier/user/${lienPP}*/}
            </div>
            <a alt="Param" id="parametres">Paramètres</a>
            <button id="deconnexion" onClick={handleSubmit}>Déconnexion</button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Accueil;