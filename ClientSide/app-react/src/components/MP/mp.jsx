import React, { useEffect, useContext, useState } from "react";

import axios from "../../utils/axiosConf";
import { UserContext } from "../../contexts/user.context";

const OwnMessage = ({ message, username, lienPP }) => {
  return (
    <div className="own_message">
      <p className="own_message_text">{message}</p>
      <div className="userA">
        <p className="username">{username}</p>
        <img className="iconMessage" src={lienPP} />
      </div>
    </div>
  );
};

const OtherMessage = ({ message, username, lienPP }) => {
  return (
    <div className="other_message">
      <p className="other_message_text">{message}</p>
      <div className="userB">
        <img className="iconMessage" src={lienPP} />
        <p className="username">{username}</p>
      </div>
    </div>
  );
};

/**
 * @desc Affiche l'interface d'un message privé (liste des messages ainsi que le nom de l'interlocuteur)
 */
const MessagePrv = () => {
  const { contexteID } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:3000/MP/", {
        params: {
          id: contexteID,
        },
      })
      .then((res) => {
        setMessages(res.data.messages);
      });
  }, []);

  return (
    <>
      <div className="message_prv">
        <div className="messages">
          {messages.map((message) => {
            if (message.isOwnMessage) {
              return (
                <OwnMessage
                  key={message.idMessagePrv}
                  message={message.message.contenu}
                  username={message.message.Auteur.nom}
                  lienPP={message.message.Auteur.lienPP}
                />
              );
            } else {
              return (
                <OtherMessage
                key={message.idMessagePrv}
                message={message.message.contenu}
                username={message.message.Receveur.nom}
                lienPP={message.message.Receveur.lienPP}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default MessagePrv;
