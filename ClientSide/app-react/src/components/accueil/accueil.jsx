import React, { useState, useEffect, useContext } from "react";
import { UserContext} from "../../contexts/user.context";
import axios from "../../utils/axiosConf";
import AddFriend from "../user/ajoutAmi";

const Accueil = () => {
  const [amis, setAmi] = useState([]);

  const ajouterAmi = () => {
    axios
      .get("https://localhost:3000/User/friend")
      .then((res) => {
        setAmi(res.data.amis);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ajouterAmi();
  }, []);

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

  return (
    <>
      <div id="zoneAccueil">
        <div id="arrierePlanFlou"></div>
        <div id="contenuAccueil">
          <h3>Bienvenue sur discord</h3>
          <p id="message_bienvenue">Amuse-toi bien mon ami</p>
          <div className="button_param" onClick={() => handleParam()}>
            <button id="deconnexion" onClick={handleSubmit}>Déconnexion</button>
            <a alt="Param" id="parametres">Paramètres</a>
          </div>
        </div>
      </div>
      <div className="button_profil" onClick={()=>{handleProfil()}}>
        <img src="../../public/image/serverLogfo.png" alt="Profil" />
      </div>
      <div id="liste_ami">
        <p>Liste Ami : </p>
        {amis.length > 0
        ? amis.map((ami) => (
            <div key={ami.username}>
              <p>{ami.username}</p>
              <img
                id="logoServeur"
                src={ami.imgLink}
                alt={ami.lienPP}
              />
            </div>
          ))
        : "pas d'ami :("}
      </div>
      <div className="addAmi">
        <AddFriend ajouterAmi={ajouterAmi} />
      </div>
    </>
  );
};

export default Accueil;