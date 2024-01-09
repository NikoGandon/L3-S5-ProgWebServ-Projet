import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosConf";
import AddFriend from "../user/ajoutAmi";

const Amis = () => {
    const [amis, setAmi] = useState([]);

  const ajouterAmi = () => {
    axios
      .get("https://localhost:3000/User/friend")
      .then((res) => {
        setAmi(res.data.amis);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ajouterAmi();
  }, []);

  return (
    <>
      <h1>Amis</h1>
      <div id="liste_ami">
        <p>Liste Ami : </p>
        {amis.length > 0
        ? amis.map((ami) => (
            <div key={ami.username}>
              <p>{ami.username}</p>
              <img
                id="logoServeur"
                src={ami.imgLink}
                alt={ami.lienPP}
              />
            </div>
          ))
        : "pas d'ami :("}
      </div>
      <div className="addAmi">
        <AddFriend ajouterAmi={ajouterAmi} />
      </div>
    </>
  );
};

export default Amis;
