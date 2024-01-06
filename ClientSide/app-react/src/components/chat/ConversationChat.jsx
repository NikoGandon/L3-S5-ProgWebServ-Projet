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
  const { contexteUser, contexteID, contexteSalon } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [infosConv, setInfosConv] = useState();

  useEffect(() => {
    if (contexteUser === "serveur" || contexteUser === "groupe") {
      axios
        .get("https://localhost:3000/" + contexteUser, {
          params: {
            idServeur: contexteUser === "serveur" ? contexteID : null,
            idGroupe: contexteUser === "groupe" ? contexteID : null,
            idSalon: contexteSalon,
          },
        })
        .then((res) => {
          setInfosConv(res.data.nomSalon);
          // setInfosConv(res.data.groupe.nom); // A voir ce que renvoie le groupe

          if (res.data.messages && Array.isArray(res.data.messages)) {
            setMessages(res.data.messages);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des messages", error);
        });

      const socket = io("https://localhost:3000");

      socket.emit("join" + contexteUser, { id: contexteSalon || contexteID });

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
    }
  }, [contexteUser, contexteID, contexteSalon]);

  console.log("infoConv", infosConv);

  return (
    <div className="messageConv">
      <div className="messages">
        {messages.length > 1 ? (
          messages.map((message) => {
            if (message.isOwnMessage) {
              return (
                <OwnMessage
                  key={message.idMessagePrv}
                  message={message.message.contenu}
                  username={message.message.nom}
                  lienPP={message.message.lienPP}
                />
              );
            } else {
              return (
                <OtherMessage
                  key={message.idMessagePrv}
                  message={message.message.contenu}
                  username={message.message.nom}
                  lienPP={message.message.lienPP}
                />
              );
            }
          })
        ) : (
          <p>Pas de message dans {infosConv}</p>
        )}
      </div>
    </div>
  );
};

export default ConversationChat;
