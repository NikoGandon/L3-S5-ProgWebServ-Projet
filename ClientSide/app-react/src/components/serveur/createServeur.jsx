import React, { useState, useContext } from "react";
import axios from "../../utils/axiosConf";
import PopUp from "../pop-up/pop-up.model";

import { PopupContext } from "../../contexts/popup.context";

import "../../../src/cssGeneral.css";

const Form = ({ onSubmit }) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { closePopUp } = useContext(PopupContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nom, description, image });
    closePopUp();
  };

  return (
    <PopUp>
      <form className="form_create_serveur" onSubmit={handleSubmit}>
        <input
          className="input_create_serveur"
          type="text"
          placeholder="Nom du serveur"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          className="input_create_serveur"
          type="text"
          placeholder="Description du serveur"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Ajouter une entrée pour l'image */}
        <input
          className="input_create_serveur"
          type="text"
          placeholder="Image du serveur"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Créer le serveur</button>
      </form>
    </PopUp>
  );
};

const CreateServeur = ({ ajouterServeur }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { openPopup } = useContext(PopupContext);

  const handleBoutonCreate = () => {
    setIsFormVisible(!isFormVisible);
    openPopup();
  };

  const handleSubmit = (data) => {
    if (data.description === "") {
      data.description = "Aucune description";
    }
    if (data.image === "") {
      data.image = "../../public/image/serverLogo.png";
    }
    axios
      .post("https://localhost:3000/Serveur/", {
        nom: data.nom,
        description: data.description,
        lienImage: data.image,
      })
      .then((res) => {
        console.log("Serveur créé avec succès", res.data);
        ajouterServeur();
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la création du serveur", error);
      });
  };

  return (
    <>
      <div className="div_create_serveur" onClick={handleBoutonCreate}>
        <button>
          {/* <img className="icon_create_serveur" src="../../../images/plus.png" /> */}
          <p className="name_create_serveur">✚</p>
        </button>
      </div>
      {isFormVisible && <Form onSubmit={handleSubmit} />}
    </>
  );
};

export default CreateServeur;
