import React, { useState, useEffect, useContext } from "react";

import axios from "../../utils/axiosConf";
import { UserContext } from "../../contexts/user.context";

import ConversationChat from "../chat/ConversationChat";
import BarreChat from "../chat/BarreChat";

/*const MemberList = ({ membres }) => {
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
};*/

/**
 * @desc Affiche l'interface d'un serveur (liste des salons, liste des membres, liste des messages)
 */
const Serveur = () => {
  const { contexteID, contexteSalon, handleServeurSelect } =
    useContext(UserContext);
  const [membres, setMembres] = useState([]);
  const [nomServeur, setNomServeur] = useState("");
  const [nomSalon, setNomSalon] = useState("");


  const loadServeur = async () => {
    await axios
      .get("https://localhost:3000/serveur/", {
        params: {
          idServeur: contexteID,
        },
      })
      .then((res) => {
        setMembres(res.data.serveur.membres);
        setNomServeur(res.data.serveur.nom);
        handleServeurSelect(contexteID, res.data.serveur.salons[0].id);
      });
  };

  const loadSalon = async () => {
    await axios
      .get("https://localhost:3000/serveur/", {
        params: {
          idServeur: contexteID,
          idSalon: contexteSalon,
        },
      })
      .then((res) => {
        setNomSalon(res.data.nomSalon);
      });
  };

  useEffect(() => {
    loadServeur().then(() => {
      loadSalon();
    });
  }, [contexteID, contexteSalon]);

  return (
    <>
    <div className="container">

      <div className="zoneChat">
        <h3 className="titleNameServeur">Bienvenue sur {nomServeur}</h3>
          <div className="messageList">
            <div className="scroll-zone">
              <div className="content-message">
                {contexteSalon != null && <ConversationChat />}
              </div>
            </div>
          </div>
          <div className="barreChat">{contexteSalon != null && <BarreChat />}</div>
          </div>
      
      <div className="memberZone">
        <h3 className="titleNameServeur">Liste des membres</h3>
        <div className="memberList">
          {membres.length > 0 
          ? membres.map((memb) => {
            return (
              <div>
              <p key={memb.id}>
                - {memb.username}
              </p>
              </div>
            );
          })
        : <p>Aucun Membre ✘</p>}
        </div>
      </div>

      </div>
    </>
  );
};

export default Serveur;
