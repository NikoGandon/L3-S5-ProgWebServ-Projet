const { useState, useEffect } = require("react");

const { axios } = require("../../../utils/axiosConf");

const barreLatServeur = (serveurID) => {
  useEffect(() => {
    axios
      .get("https://localhost:3000/serveur", {
        params: {
          idServeur: serveurID,
        },
      })
      .then((res) => {
        setServeur(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};

export default barreLatServeur;
