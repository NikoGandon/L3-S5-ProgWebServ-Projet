import React, { useState } from "react";

import axios from "../../../utils/axiosConf";
import PopUp from "../../pop-up/pop-up.model";

/**
 * @desc Affiche le formulaire de création de serveur (nom, image, description, catégorie, type, lien, date)
 * @returns
 */
const Form = () => {
  return (
    <PopUp>
      <form className="form_create_serveur">
        <input
          className="input_create_serveur"
          type="text"
          placeholder="Nom du serveur"
        />
        <input
          className="input_create_serveur"
          type="text"
          placeholder="Description du serveur"
        />
        {/*TODO: Ajouter une image*/}
      </form>
    </PopUp>
  );
};

/**
 * @desc Permet de créer un serveur
 * @param {string} nom - Nom du serveur
 * @param {string} image - Image du serveur
 * @param {string} description - Description du serveur
 */
//TODO: terminer la fonction
const CreateServeur = () => {
  const [nom, setNom] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [serveur, setServeur] = useState([]);

  const handleSubmit = () => {
    axios
      .post("https://localhost:3000/serveur/", {
        nom: nom,
        image: image,
        description: description,
      })
      .then((res) => {
        setServeur(res.data);
      });
  };

  const handleBoutonCreate = () => {
    //TODO : Afficher le formulaire de création de serveur
  };

  return (
    <>
      <button>
        <div className="div_create_serveur" onClick={handleBoutonCreate}>
          <img className="icon_create_serveur" src="../../../images/plus.png" />
          <p className="name_create_serveur">Créer un serveur</p>
        </div>
      </button>
    </>
  );
};
