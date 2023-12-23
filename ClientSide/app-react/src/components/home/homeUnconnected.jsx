import { React, useState } from "react";
import Authentication from "../authentification/authentication";

const NavBar = () => {
  return (
    <div id="navBar">
      <button type="button">Se connecter</button>
    </div>
  );
};

const HomeUnconnected = () => {
  let [showAuth, setShowAuth] = useState(false);

  function handleButton() {
    setShowAuth(!showAuth);
  }

  return (
    <>
      <Authentication />
    </>
  );
};

export default HomeUnconnected;
