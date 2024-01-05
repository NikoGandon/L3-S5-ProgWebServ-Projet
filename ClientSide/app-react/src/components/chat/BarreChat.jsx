import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { io } from "socket.io-client";

/**
 * @desc Logique pour le formulaire de chat
 * @param {*} sendMessage
 * @returns
 */
const FormChat = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder={`Envoyer un message`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="Envoyer" />
      </form>
    </>
  );
};

/**
 * @desc Affiche une barre de chat, utilise le contexte pour savoir si on est dans un groupe ou un serveur et pour rejoindre au bon socket
 * @returns
 */
const Chat = () => {
  const { contexteUser, contexteID, contexteSalon } = useContext(UserContext);

  useEffect(() => {
    const socket = io("https://localhost:3000");
    socket.emit("join" + contexteUser, { id: contexteSalon || contexteID });
    return () => {
      socket.off("sendMessage");
      socket.disconnect();
    };
  }, [contexteUser, contexteID, contexteSalon]);

  const sendMessage = (message) => {
    const socket = io("https://localhost:3000");
    socket.emit("sendMessage", message);
  };

  return (
    <>
      <FormChat sendMessage={sendMessage} />
    </>
  );
};

export default Chat;
