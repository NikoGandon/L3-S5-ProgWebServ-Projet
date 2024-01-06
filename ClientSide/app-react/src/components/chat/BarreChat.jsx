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

  const socket = io("https://localhost:3000", {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.emit("joinRoom", {
      roomType: contexteUser,
      roomId: contexteSalon || contexteID,
    });
    /*
    return () => {
      socket.disconnect();
    };*/
  }, [contexteUser, contexteID, contexteSalon, socket]);

  const sendMessage = (message) => {
    socket.emit("sendMessage", {
      roomType: contexteUser,
      roomId: contexteSalon || contexteID,
      contenu: message,
      serveurId: contexteUser === "serveur" ? contexteID : null,
    });
  };

  return (
    <>
      <FormChat sendMessage={sendMessage} />
    </>
  );
};

export default Chat;
