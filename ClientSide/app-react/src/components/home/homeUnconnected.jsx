import React, { useState } from "react";
import Authentication from "../authentification/authentication";

const NavBar = ({ onAuth, value }) => {
  return (
    <div id="navBar">
      <button id="homeUnconnectedButton" type="button" onClick={onAuth}>
        {value}
      </button>
    </div>
  );
};

const HomeUnconnected = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleAuth = () => {
    setIsAuth(!isAuth);
  };

  return (
    <>
      {isAuth ? (
        <>
          <Authentication />
        </>
      ) : (
        <>
          {}
          <div id="homeUnconnected">
            <div id="contenthomeUnconnected">
              <h2>Bienvenue !</h2>
              <img src="../../public/image/ttt.png" id="imgHomeUnconnected"></img>
              <NavBar onAuth={handleAuth} value={"Nous rejoindre"} />
              </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomeUnconnected;
