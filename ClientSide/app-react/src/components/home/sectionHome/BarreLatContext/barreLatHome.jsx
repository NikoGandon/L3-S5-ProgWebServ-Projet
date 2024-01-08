import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../utils/axiosConf";
import { UserContext } from "../../../../contexts/user.context";
import CreateGroupe from "../../../groupe/createGroupe";

/**
 * @desc Affiche tous les Groupes et MP dont l'utilisateur est membre
 *       trié par ordre chronologique
 */
const BarreLatHome = ({ handleClick }) => {
  const [groupesMembre, setGroupesMembre] = useState([]);
  const { handleGroupeSelect } = useContext(UserContext);

  const [groupes, setGroupes] = useState([]);
  const ajouterGroupe = () => {
    axios
      .get("https://localhost:3000/user/get-DM")
      .then((res) => {
        setGroupes(res.data.Groupes);
        console.log(groupes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ajouterGroupe();
  }, []);

  return (
    <>
      <div className="barreLatHome">
        <div className="box_mp">
          {groupes.length > 0 ? (
            groupes.map((item) => (
              <div
              key={item.id}
              onClick={() => {
                handleGroupeSelect(item.id);
              }}
            >
              <p>{item.id}</p>
              <div className="NomGroupe">Groupe: {item.nomGroupe}</div>
            </div>
            ))
          ) : (
            <p>Commencez à discuter !</p>
          )}
        </div>
        <div className="createGroupe">
          <CreateGroupe ajouterGroupe={ajouterGroupe} />
        </div>
      </div>
    </>
  );
};

export default BarreLatHome;
