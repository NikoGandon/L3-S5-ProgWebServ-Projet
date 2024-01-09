import React, { useState, useContext } from "react";
import axios from "../../utils/axiosConf";
import PopUp from "../pop-up/pop-up.model";

import { PopupContext } from "../../contexts/popup.context";

import "../../../src/cssGeneral.css";

const Form = ({ onSubmit }) => {
  const [nom, setNom] = useState("");

  const {closePopup} = useContext(PopupContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({nom});
    closePopup();
  };

  return (
    <PopUp>
      <form className="form_create_serveur" onSubmit={handleSubmit}>
        <input
          className="input_create_serveur"
          type="text"
          placeholder="nom de l'ami"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <button type="submit">Ajouter ami</button>
      </form>
    </PopUp>
  );
};

const AddFriend = ({ ajouterAmi }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { openPopup } = useContext(PopupContext);

  const handleBoutonCreate = () => {
    setIsFormVisible(!isFormVisible);
    openPopup();
  };

  const handleSubmit = (data) => {
    console.log(data.nom);
    axios
      .post("https://localhost:3000/User/friend", {
        nom: data.nom,
      })
      .then((res) => {
        console.log("Amitiée créé avec succès", res.data);
        ajouterAmi();
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error("Erreur dans l'amitiée", error);
      });
  };

  return (
    <>
      <div className="div_add_ami" onClick={handleBoutonCreate}>
        <button>
          <p className="name_add_ami">Ajouter un ami</p>
        </button>
      </div>
      {isFormVisible && <Form onSubmit={handleSubmit} />}
    </>
  );
};

export default AddFriend;
