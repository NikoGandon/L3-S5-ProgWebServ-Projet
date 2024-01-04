import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { io } from "socket.io-client";
import axios from "axios";

const FormatMessage = (message) => {
  return {
    ...message,
    date: new Date(message.date),
  };
};

const ConversationChat = () => {
  const { contexteUser, contexteID } = useContext(UserContext); // contexteUser = Serveur, Groupe, Accueil, Param
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:3000/groupe/", {
        params: {
          id: contexteID,
        },
      })
      .then((res) => {
        console.log(res);
        setMessages(res.data.message);
      });

    const socket = io("https://localhost:3000");

    socket.emit("join" + contexteUser, { id: contexteID });

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

  return (
    <>
      {messages.map((message) => (
        <FormatMessage key={message.id} message={message} />
      ))}{" "}
    </>
  );
};

export default ConversationChat;
