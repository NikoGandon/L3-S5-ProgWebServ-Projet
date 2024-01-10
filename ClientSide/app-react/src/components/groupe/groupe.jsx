import React, { useEffect, useContext, useState } from "react";
import "./groupe.css";

import axios from "../../utils/axiosConf";
import { UserContext } from "../../contexts/user.context";
import BarreChat from "../chat/BarreChat";
import Conversation from "../chat/ConversationChat";

/**
 * @desc Affiche l'interface d'un groupe (liste des membres, liste des messages)
 */
const Groupe = () => {
  const { contexteID } = useContext(UserContext);
  const [groupe, setGroupe] = useState([]);
  const [membreListe, setMembreListe] = useState([]);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    axios.get("https://localhost:3000/groupe", {
      params: {
        idGroupe: contexteID,
      },
    }).then((res) => {
      console.log(res);
      setGroupe(res.data.groupe);
      setMembreListe(res.data.membreListe);
      setMessages(res.data.messages);
    });
  }, []);
  return (
    <><h3>Groupe : {groupe.nom}</h3>
      <Conversation />
      <div id="barreChatGroupe">
      <BarreChat />
      </div>
    </>
  );
};

export default Groupe;
