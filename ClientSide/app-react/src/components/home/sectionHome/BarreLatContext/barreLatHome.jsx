import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../utils/axiosConf";
import { UserContext } from "../../../../contexts/user.context";

/**
 * @desc Section d'un groupe
 * @returns
 */
const GroupeBox = ({ nomGroupe, nbMembres, handleClick }) => {
  return (
    <button
      className="btn_find_groupe"
      onClick={() => {
        handleClick("groupe", id);
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
  const [mergedList, setMergedList] = useState([]);

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


  return (
    <>
      <div className="barreLatHome">
        <div className="box_mp">
          {groupesMembre.length > 0 ? (
            groupesMembre.map((item) =>
              <GroupeBox
                key={item.id}
                nomGroupe={item.nom}
                nbMembres={item.nbMembres}
                handleClick={handleClick}
              />
            )
          ) : (
            <p>Commencez à discuter !</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BarreLatHome;
