import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { UserContext } from "./user.context";

const SocketContext = createContext({
  socket: null,
  isConnected: false,
});

const ContextSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { contexteUser, contexteID, contexteSalon } = useContext(UserContext);

  useEffect(() => {
    const socket = io("https://localhost:3000", { transports: ["websocket"] });

    setSocket(socket);

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  /*
  useEffect(() => {

    socket.emit("joinRoom", contexteUser, contexteSalon || contexteID);

    socket.on("message", (message) => {
      console.log(message);
    });

  }, [contexteID, contexteSalon ,socket]);*/

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ContextSocketProvider };
