import React, { useEffect } from "react";
import axios from "axios";

const OAuth2 = () => {
  const handleGoogle = () => {
    const newWindow = window.open(
      "https://localhost:3000/auth/google",
      "_blank",
      "width=600,height=400,toolbar=no,location=no,menubar=no"
    );
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === "http://localhost:3000") {
        const token = event.data.token;
        console.log("Données reçues avec succès:", event.data);
        localStorage.setItem("token", event.data.token);
        event.source.close();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <button id="connectGoogle" onClick={handleGoogle}>
      Se connecter avec google
    </button>
  );
};

export default OAuth2;
