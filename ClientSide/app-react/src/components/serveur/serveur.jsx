import React, { useState, useEffect } from "react";

/**
 * @desc Affiche l'interface d'un serveur (liste des salons, liste des membres, liste des messages)
 */
const Serveur = ({IDServeur}) => {
  const [idServeur, setIdServeur] = useState(IDServeur);

  useEffect(() => {
    axios
      .get("https://localhost:3000/serveur/", {
        params: {
          id: idServeur,
        },
      })
      .then((res) => {});
  }, []);

  return (
    <>
      <h1>Serveur</h1>
    </>
  );
};

export default Serveur;
