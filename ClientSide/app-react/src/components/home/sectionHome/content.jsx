import React, { useContext } from "react";

import Serveur from "../../serveur/serveur";
import Groupe from "../../groupe/groupe";
import Profil from "../../user/profil";
import Amis from "../../user/amis.jsx";
import Param from "../../user/param.jsx";
import Acceuil from "../../accueil/accueil.jsx";

import { UserContext } from "../../../contexts/user.context";
import { ContextSocketProvider } from "../../../contexts/socketio.context";

const Content = () => {
  const { contexteUser } = useContext(UserContext);

  let content = null;

  switch (contexteUser) {
    case "serveur":
      content = <Serveur />;
      break;
    case "groupe":
      content = <Groupe />;
      break;
    case "profil":
      content = <Profil />;
      break;
    case "param":
      content = <Param />;
      break;
    case "acceuil":
      content = <Acceuil />;
      break;
    case "amis":
      content = <Amis />;
      break;
    default:
      content = <Acceuil />;
      break;
  }

  return (
    <>
      <ContextSocketProvider>{content}</ContextSocketProvider>
    </>
  );
};

export default Content;
