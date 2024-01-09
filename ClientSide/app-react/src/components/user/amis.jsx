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
    <div id="zoneAmis">
    <div id="arrierePlanFlou">
        <div id="contenuAmis">

      <h2>Amis</h2>
      <div id="barre"></div>
      <div id="liste_ami">
        {amis.length > 0
        ? amis.map((ami) => (
            <div key={ami.username} id="backgroundAmi">
                <img
                id="logoServeur"
                src="../../public/image/amis.png"//{ami.imgLink}
                alt={ami.lienPP}
              />
              <p>{ami.username}</p>
            </div>
          ))
        : "pas d'ami :("}
      </div>
      <div className="addAmi">
        <AddFriend ajouterAmi={ajouterAmi} />
      </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Amis;
