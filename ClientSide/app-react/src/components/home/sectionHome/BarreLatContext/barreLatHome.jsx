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
 * @desc Section d'un message privé
 * @returns
 */
const MessagePriveBox = ({ nomUtilisateur, handleClick }) => {
  return (
    <button
      className="btn_find_groupe"
      onClick={() => {
        handleClick("mp", id);
      }}
    >
      <div className="div_find_groupe">
        <img className="icon_mp" src="../../../images/singe.jpg" />
        <div className="name_mp_box">
          <p className="name_mp">{nomUtilisateur}</p>
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
  const [messagesPrives, setMessagesPrives] = useState([]);
  const [mergedList, setMergedList] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:3000/user/get-DM")
      .then((res) => {
        console.log(res.data);

        const groupesTriés = res.data.groupes.sort((a, b) => {
          const dateA = new Date(a.messages[0]?.message.createdAt || 0);
          const dateB = new Date(b.messages[0]?.message.createdAt || 0);
          return dateB - dateA;
        });

        const messagesTriés = res.data.messagesPrives.sort((a, b) => {
          const dateA = new Date(a.message.createdAt);
          const dateB = new Date(b.message.createdAt);
          return dateB - dateA;
        });

        setGroupesMembre(groupesTriés);
        setMessagesPrives(messagesTriés);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const mergedList = [...groupesMembre, ...messagesPrives];

    mergedList.sort((a, b) => {
      const dateA = new Date(a.message.createdAt || 0);
      const dateB = new Date(b.message.createdAt || 0);
      return dateB - dateA;
    });

    setMergedList(mergedList);
  }, [groupesMembre, messagesPrives]);

  return (
    <>
      <div className="barreLatHome">
        <div className="box_mp">
          {mergedList.length > 0 ? (
            mergedList.map((item) =>
              item.nom ? (
                <GroupeBox
                  key={item.id}
                  nomGroupe={item.nom}
                  nbMembres={item.nbMembres}
                  handleClick={handleClick}
                />
              ) : (
                <MessagePriveBox
                  key={item.id}
                  nomUtilisateur={item.nomUtilisateur}
                  handleClick={handleClick}
                />
              )
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
