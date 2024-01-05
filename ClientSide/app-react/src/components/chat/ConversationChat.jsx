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

  return (
    <>
      {messages.map((message) => (
        <FormatMessage key={message.id} message={message} />
      ))}{" "}
    </>
  );
};

export default ConversationChat;
