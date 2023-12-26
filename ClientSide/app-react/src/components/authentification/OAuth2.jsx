import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const OAuth2 = () => {
  const cookies = new Cookies();

  let [token, setToken] = useState(null);

  const handleGoogle = async () => {
    const authWindow = window.open("https://127.0.0.1:3000/auth/oauth/", "_blank");
    const checkClosed = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkClosed);
        const authToken = cookies.get("authToken");
        console.log(authToken || "no token get");
        if (authToken) {
          setToken(authToken);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    const authToken = cookies.get("authToken");
    if (authToken) {
      setToken(authToken);
      console.log(token);
    }
    console.log("not tokens");
  }, [cookies]);

  return (
    <button id="connectGoogle" onClick={handleGoogle}>
      Se connecter avec google
    </button>
  );
};

export default OAuth2;
