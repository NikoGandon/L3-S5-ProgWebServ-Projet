import React, { useState } from "react";
import axios from "../../utils/axiosConf";
import { usePopup } from "../../contexts/popup.context";
import "../../../src/cssGeneral.css";

const Form = ({ onSubmit }) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");

  const { closePopup } = usePopup();

  const handleSubmit = () => {
    axios
      .post("https://localhost:3000/Serveur/salon/", {
        nom,
        description,
      })
      .then((res) => {
        console.log("Salon créé avec succès", res.data);
        onSubmit();
        closePopup();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erreur lors de la création du salon", error);
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
      <h2>Créer un salon</h2>
      <input
        className="input_create_serveur"
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <input
        className="input_create_serveur"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="submit_create_serveur">Créer le salon</button>
    </form>
  );
};

const CreateSalon = ({ ajouterSalon }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { openPopup } = usePopup();

  const handleBoutonCreate = () => {
    setIsFormVisible(!isFormVisible);
    openPopup(<Form onSubmit={() => setIsFormVisible(false)} />);
  };

  return (
    <>
      <div onClick={handleBoutonCreate}>
        <button id="bouttonSalon">
          <p className="textParametres">Ajouter</p>
        </button>
      </div>
    </>
  );
};

export default CreateSalon;
