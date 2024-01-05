import React, { useState } from "react";
import axios from "../../utils/axiosConf";
import PopUp from "../pop-up/pop-up.model";

const Form = ({ onSubmit }) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nom, description, image });
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

const CreateServeur = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleBoutonCreate = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (data) => {
    axios
      .post("https://localhost:3000/serveur/", data)
      .then((res) => {
        console.log("Serveur créé avec succès", res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la création du serveur", error);
      });
  };

  return (
    <>
      <button>
        <div className="div_create_serveur" onClick={handleBoutonCreate}>
          <img className="icon_create_serveur" src="../../../images/plus.png" />
          <p className="name_create_serveur">Créer un serveur</p>
        </div>
      </button>
      {isFormVisible && <Form onSubmit={handleSubmit} />}
    </>
  );
};

export default CreateServeur;
