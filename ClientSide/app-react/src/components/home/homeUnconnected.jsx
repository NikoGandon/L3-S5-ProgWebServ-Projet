import React, { useState } from "react";
import Authentication from "../authentification/authentication";

const NavBar = ({ onAuth, value }) => {
  return (
    <div id="navBar">
      <button type="button" onClick={onAuth}>
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
          <NavBar onAuth={handleAuth} value={"Se connecter"} />
        </>
      )}
    </>
  );
};

export default HomeUnconnected;
