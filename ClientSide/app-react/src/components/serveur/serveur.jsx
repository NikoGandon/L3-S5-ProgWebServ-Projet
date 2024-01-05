import React, { useState, useEffect, useContext } from "react";

import axios from "../../utils/axiosConf";
import { UserContext } from "../../contexts/user.context";

import ConversationChat from "../chat/ConversationChat";
import BarreChat from "../chat/BarreChat";

const MemberList = ({ membres }) => {
  return (
    <>
      {membres.map((membre) => {
        return (
          <div key={membre.id}>
            <p>{membre.pseudo}</p>
          </div>
        );
      })}
    </>
  );
};

/**
 * @desc Affiche l'interface d'un serveur (liste des salons, liste des membres, liste des messages)
 */
const Serveur = () => {
  const { contexteID, contexteSalon } = useContext(UserContext);
  const [membres, setMembres] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:3000/serveur/", {
        params: {
          idSeveur: contexteID,
          idSalon: contexteSalon,
        },
      })
      .then((res) => {
        setMembres(res.data.membres);
      });
  }, [contexteID, contexteSalon]);

  return (
    <>
      <h1 className="titleNameServeur"></h1>
      <div className="memberList">
        <MemberList membres={membres} />
      </div>

      <div className="messageList">
        <ConversationChat />
      </div>
      <div className="barreChat">
        <BarreChat />
      </div>
    </>
  );
};

export default Serveur;
