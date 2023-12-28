import React from "react";

const OAuth2 = () => {

  const handleGoogle = async () => {
    let timer = null;
    const googleLoginURL = "https://localhost:3000/Auth/OAuth/";
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          if (timer) clearInterval(timer);
          window.location.reload(true);
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
