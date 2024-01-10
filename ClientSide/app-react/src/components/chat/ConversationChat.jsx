import React, { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import axios from "../../utils/axiosConf";

import { UserContext } from "../../contexts/user.context";

const FormatMessage = (message) => {
  return {
    ...message,
    date: new Date(message.createdAt),
  };
};

const OwnMessage = ({ message, username, lienPP, date }) => {
  return (
    <div className="own_message">
      <div className="userA">
        <img src="../../public/image/amis.png" width="30px" height="30px"></img>
        <p className="username">{username}</p>
        <p className="dateMessage">{date}</p>
      </div>
      <p className="own_message_text">{message}</p>
    </div>
  );
};

const OtherMessage = ({ message, username, lienPP, date }) => {
  return (
    <div className="other_message">
      <div className="userB">
        <img src="../../public/image/amis.png" width="30px" height="30px"></img>
        <p className="username">{username}</p>
        <p className="dateMessage">{date}</p>
      </div>
      <p className="other_message_text">{message}</p>
    </div>
  );
};

const ConversationChat = () => {
  const { contexteUser, contexteID, contexteSalon } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [infosConv, setInfosConv] = useState();
  const socket = io("https://localhost:3000", { transports: ["websocket"] });

  useEffect(() => {
    console.log("contexteUser", contexteUser);
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
          console.log("Données : ", res.data);
          setInfosConv(res.data.nomSalon);

          if (res.data.messages && Array.isArray(res.data.messages)) {
            console.log("data", res.data.messages);
            setMessages(res.data.messages);
            console.log("messages", messages);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des messages", error);
        });
    }
  }, []);

  useEffect(() => {
    const contextToLoad = contexteSalon || contexteID;
    socket.emit("joinRoom", contexteUser, contextToLoad);

    socket.on("incomingMessage", (newMessage) => {
      console.log("_________newMessage________", newMessage);
      if (newMessage) {
        console.log("newMessage", newMessage);
        setMessages((prevMessages) => [
          ...prevMessages, newMessage 
        ]);
      } 
    });

    return () => {
      socket.off("incomingMessage");
    };
  }, [contexteID, contexteSalon, socket]);

  console.log("messages: ", messages);

  return (
    <div className="messageConv">
      <div className="messages">
        {messages.length > 0 ? (
          messages.map((message) => {
            if (message.isOwner) {
              return (
                <div>
                <OwnMessage
                  key={message.id}
                  message={message.contenu}
                  username={message.username}
                  lienPP={message.lienPP}
                  date={message.date}
                />
                </div>
              );
            } else {
              return (
                <div>
                <OtherMessage
                  key={message.id}
                  message={message.contenu}
                  username={message.username}
                  lienPP={message.lienPP}
                  date={message.date}
                />
                </div>
              );
            }
          })
        ) : (
          <center><p>Aucun message ici</p></center>
        )}
      </div>
    </div>
  );
};

export default ConversationChat;
