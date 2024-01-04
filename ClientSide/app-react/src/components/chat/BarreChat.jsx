import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/user.context";
import { io } from "socket.io-client";

const FormChat = () => {
  const { contexteUser, contexteID } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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

const Chat = () => {
  const { contexteUser, contexteID } = useContext(UserContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = io("https://localhost:3000");
    socket.emit("join" + contexteUser, { id: contexteID });
  }, [contexteUser, contexteID]);

  return (
    <>
      <FormChat />
    </>
  );
};

export default Chat;
