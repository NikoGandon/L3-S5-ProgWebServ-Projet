import React, { useState, useContext } from "react";
import axios from "../../utils/axiosConf";
import { usePopup } from "../../contexts/popup.context";

import "../../../src/cssGeneral.css";

const Form = ({ onSubmit }) => {
  const [nom, setNom] = useState("");
  const [image, setImage] = useState("");

  const { closePopup } = usePopup();

  const handleSubmit = () => {
    axios
      .post("https://localhost:3000/Groupe", {
        nom: nom,
        lienImage: image,
      })
      .then((res) => {
        console.log("Groupe créé avec succès", res.data);
        onSubmit();
        closePopup();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erreur lors de la création du groupe", error);
      });
      
  };

  return (
      <form className="form_create_groupe" 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
  );
};

const CreateGroupe = ({ ajouterGroupe }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { openPopup } = usePopup();

  const handleBoutonCreate = () => {
    setIsFormVisible(!isFormVisible);
    openPopup(<Form onSubmit={() => setIsFormVisible(false)} />);
  };

  return (
    <>
      <div className="div_create_groupe" onClick={handleBoutonCreate}>
        <button className="button_create_groupe">
          Créer un groupe
        </button>
      </div>
    </>
  );
};

export default CreateGroupe;
