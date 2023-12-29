import React, { useState, useEffect } from "react";

/**
 * @desc Permet de créer un serveur
 * @param {string} nom - Nom du serveur
 * @param {string} image - Image du serveur
 * @param {string} description - Description du serveur
 * @param {string} categorie - Catégorie du serveur
 * @param {string} type - Type du serveur
 * @param {string} lien - Lien du serveur
 * @param {string} date - Date de création du serveur
 */

const CreateServeur = () => {
  const [nom, setNom] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [type, setType] = useState("");
  const [lien, setLien] = useState("");
  const [date, setDate] = useState("");

  const [serveur, setServeur] = useState([]);

  const handleSubmit = () => {
    axios
      .post("https://localhost:3000/serveur/create", {
        nom: nom,
        image: image,
        description: description,
        categorie: categorie,
        type: type,
        lien: lien,
        date: date,
      })
      .then((res) => {
        setServeur(res.data);
      });
  };

  const handleBoutonCreate = () => {
    handleSubmit();
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
