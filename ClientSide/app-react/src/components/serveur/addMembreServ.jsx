import React, { useState, useContext } from "react";
import axios from "../../utils/axiosConf";
import { usePopup } from "../../contexts/popup.context";
import { UserContext } from "../../contexts/user.context";
import "../../../src/cssGeneral.css";

const Form = ({ onSubmit, idServ}) => {
  const [nom, setNom] = useState("");
  const {contextID, contextUser} = useContext(UserContext);

  const { closePopup } = usePopup();
  
  console.log("idServ: ",idServ)

  console.log("!!!! CONTEXT !!!!", contextID);
  console.log("!!!! CONTEXT !!!!", contextUser);

  const handleSubmit = () => {
    console.log(contextUser);
        axios
        .post("https://localhost:3000/serveur/invite", {
            nom: nom,
            idServer: idServ
        })
        .then((res) => {
            console.log("Amitiée créé avec succès", res.data);
            onSubmit();
            closePopup();
            //window.location.reload();
        })
        .catch((error) => {
            console.error("Erreur dans l'amitiée", error);
        });
  };

  return (
      <form className="form_create_serveur"
        onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      >
        <h2>Ajouter un membre</h2>
        <input
          className="input_create_serveur"
          type="text"
          placeholder="Nom du membre"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <button type="submit" className="submit_create_serveur">Ajouter membre</button>
      </form>
  );
};

const AddMembre = ({ idServ }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { openPopup } = usePopup();

  const handleBoutonCreate = () => {
    setIsFormVisible(!isFormVisible);
    openPopup(<Form onSubmit={() => setIsFormVisible(false)} idServ={idServ}/>);
  };

  console.log();

  

  return (
    <>
      <div className="div_add_membre" >
      <button id="bouttonMembre" onClick={handleBoutonCreate}>
          <img src="../../public/image/ajouterMembre.png" width="35px" height="35px"></img>
          <p id="textMembre">Ajouter</p>
         </button>
      </div>
    </>
  );
};

export default AddMembre;
