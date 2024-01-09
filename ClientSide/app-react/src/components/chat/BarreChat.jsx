import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { io } from "socket.io-client";
import "../../cssGeneral.css";

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
      <form onSubmit={handleSubmit} id="formChat">
        <div id="zoneDeText">
        <input
          type="text"
          name="message"
          placeholder={`Envoyer un message`}
          id="zoneEnvoieMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="➤" id="envoyer"/>
        </div>
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
  console.log("connect");
  const socket = io("https://localhost:3000", {
    transports: ["websocket"],
  });

  const contextToLoad = contexteSalon || contexteID;

  useEffect(() => {
    socket.emit("joinRoom", contexteUser, contextToLoad);

    return () => {
      console.log("disconnect");
      socket.close();
    };
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
