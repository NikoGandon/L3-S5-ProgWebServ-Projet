import React, { useState } from "react";
import axios from "../../utils/axiosConf";
import { usePopup } from "../../contexts/popup.context";
import "../../../src/cssGeneral.css";

const Form = ({ onSubmit }) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { closePopup } = usePopup();

  const handleSubmit = () => {
    axios
      .post("https://localhost:3000/Serveur/", {
        nom,
        description,
        lienImage: image,
      })
      .then((res) => {
        console.log("Serveur créé avec succès", res.data);
        onSubmit();
        closePopup();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erreur lors de la création du serveur", error);
      });
  };

  return (
    <form
      className="form_create_serveur"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h2>Créer un serveur</h2>
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
        type="file"
        id="upload_image_serveur"
        accept="image/png"
        placeholder="Image du serveur"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit" className="submit_create_serveur">Créer le serveur</button>
    </form>
  );
};

const CreateServeur = ({ ajouterServeur }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { openPopup } = usePopup();

  const handleBoutonCreate = () => {
    setIsFormVisible(!isFormVisible);
    openPopup(<Form onSubmit={() => setIsFormVisible(false)} />);
  };

  return (
    <>
      <div className="div_create_serveur" onClick={handleBoutonCreate}>
        <button>
          <p className="name_create_serveur">✚</p>
        </button>
      </div>
    </>
  );
};

export default CreateServeur;
