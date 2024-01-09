import React, { useState, useContext } from "react";
import axios from "../../utils/axiosConf";
import { usePopup } from "../../contexts/popup.context";

import "../../../src/cssGeneral.css";

const Form = ({ onSubmit }) => {
  const [nom, setNom] = useState("");

  const { closePopup } = usePopup();

  const handleSubmit = () => {
    axios
      .post("https://localhost:3000/User/friend", {
        nom: nom,
      })
      .then((res) => {
        console.log("Amitiée créé avec succès", res.data);
        onSubmit();
        closePopup();
        window.location.reload();
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
        <input
          className="input_create_serveur"
          type="text"
          placeholder="nom de l'ami"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <button type="submit">Ajouter ami</button>
      </form>
  );
};

const AddFriend = ({ ajouterAmi }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { openPopup } = usePopup();

  const handleBoutonCreate = () => {
    setIsFormVisible(!isFormVisible);
    openPopup(<Form onSubmit={() => setIsFormVisible(false)} />);
  };

  

  return (
    <>
      <div className="div_add_ami" onClick={handleBoutonCreate}>
        <button>
          <p className="name_add_ami">Ajouter un ami</p>
        </button>
      </div>
    </>
  );
};

export default AddFriend;
