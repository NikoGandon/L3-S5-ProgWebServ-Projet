import React, { useState, useContext } from "react";
import axios from "../../utils/axiosConf";
import PopUp from "../pop-up/pop-up.model";

import { PopupContext } from "../../contexts/popup.context";

import "../../../src/cssGeneral.css";

const Form = ({ onSubmit }) => {
  const [nom, setNom] = useState("");
  const [image, setImage] = useState("");

  const {closePopup} = useContext(PopupContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nom, image });
    closePopup();
  };

  return (
    <PopUp>
      <form className="form_create_groupe" onSubmit={handleSubmit}>
        <input
          className="input_create_groupe"
          type="text"
          placeholder="Nom du groupe"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        {/* Ajouter une entrée pour l'image */}
        <input
          className="input_create_groupe"
          type="text"
          placeholder="Image du groupe"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Créer le groupe</button>
      </form>
    </PopUp>
  );
};

const CreateGroupe = ({ ajouterGroupe }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { openPopup } = useContext(PopupContext);

  const handleBoutonCreate = () => {
    setIsFormVisible(!isFormVisible);
    openPopup();
  };

  const handleSubmit = (data) => {
    axios
      .post("https://localhost:3000/Groupe", {
        nom: data.nom,
        lienImage: data.image,
      })
      .then((res) => {
        console.log("Groupe créé avec succès", res.data);
        ajouterGroupe();
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la création du groupe", error);
      });
  };

  return (
    <>
      <div className="div_create_groupe" onClick={handleBoutonCreate}>
        <button className="button_create_groupe">
          {/* <img className="icon_create_serveur" src="../../../images/plus.png" /> */}
          Créer un groupe
        </button>
      </div>
      {isFormVisible && <Form onSubmit={handleSubmit} />}
    </>
  );
};

export default CreateGroupe;
