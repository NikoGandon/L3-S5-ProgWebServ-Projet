import React, { useState, useEffect } from "react";

const OAuth2 = () => {

  const handleGoogle = async () => {
    let timer = null;
    const googleLoginURL = "https://127.0.0.1:3000/Auth/OAuth/";
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };


  return (
    <button id="connectGoogle" onClick={handleGoogle}>
      Se connecter avec google
    </button>
  );
};

export default OAuth2;
