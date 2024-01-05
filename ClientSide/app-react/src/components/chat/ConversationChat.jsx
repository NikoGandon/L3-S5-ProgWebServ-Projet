import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { io } from "socket.io-client";
import axios from "../../utils/axiosConf";

const FormatMessage = (message) => {
  return {
    ...message,
    date: new Date(message.date),
  };
};

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

const ConversationChat = () => {
  const { contexteUser, contexteID, contexteSalon } = useContext(UserContext); // contexteUser = Serveur, Groupe || contexteSalon = ID du salon (serveur)
  const [messages, setMessages] = useState([]);

  if (contexteUser === "serveur" || contexteUser === "groupe") {
    useEffect(() => {
      axios
        .get("https://localhost:3000/" + contexteUser, {
          params: {
            idServeur: contexteUser === "serveur" ? contexteID : null,
            idGroupe: contexteUser === "groupe" ? contexteID : null,
            idSalon: contexteSalon,
          },
        })
        .then((res) => {
          console.log(res);
          setMessages(res.data.messages || "pas de message");
        });

      const socket = io("https://localhost:3000");

      socket.emit("join" + contexteUser, { id: contexteSalon | contexteID });

      socket.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          FormatMessage(newMessage),
        ]);
      });

      return () => {
        socket.off("newMessage");
        socket.disconnect();
      };
    }, []);
  }

  /*return (
    <>
      {messages.map((message) => (
        <FormatMessage key={message.id} message={message} />
      ))}{" "}
    </>
  );*/

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

export default ConversationChat;
