import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../utils/axiosConf";
import { UserContext } from "../../../../contexts/user.context";

/**
 * @desc Section d'un groupe
 * @returns
 */
const GroupeBox = ({ nomGroupe, nbMembres, idGroupe, handleClick }) => {
  return (
    <button
      className="btn_find_groupe"
      onClick={() => {
        handleClick("groupe", idGroupe);
      }}
    >
      <div className="div_find_groupe">
        <img className="icon_mp" src="../../../images/singe.jpg" />
        <div className="name_mp_box">
          <p className="name_mp">{nomGroupe}</p>
          <p className="name_mp">{nbMembres} membres</p>
        </div>
      </div>
    </button>
  );
};

/**
 * @desc Affiche tous les Groupes et MP dont l'utilisateur est membre
 *       trié par ordre chronologique
 */
const BarreLatHome = ({ handleClick }) => {
  const [groupesMembre, setGroupesMembre] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:3000/user/get-DM")
      .then((res) => {
        console.log(res.data.Groupes);
        setGroupesMembre(res.data.Groupes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(groupesMembre);

  const [groupes, setGroupes] = useState([]);
  const [messages, setMessages] = useState("");

  const ajouterGroupe = () => {
    axios
      .get("https://localhost:3000/user/get-DM")
      .then((res) => {
        setGroupes(res.data.Groupe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(groupesMembre);

  return (
    <>
      <div className="barreLatHome">
        <div className="box_mp">
          {groupes ? (
            groupes.length > 0 ? (
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
            )
          ) : (
            <p>{messages}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BarreLatHome;