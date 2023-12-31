import React, { useContext } from "react";

import Serveur from "../../serveur/serveur";
import Groupe from "../../groupe/groupe";
import MessagePrv from "../../MP/mp";
import Profil from "../../user/profil";
import Param from "../../user/param.jsx";

import { UserContext } from "../../../contexts/user.context";

const Content = () => {
  const contexte = useContext(UserContext);

  let content = null;
  console.log(contexte);

  switch (contexte.contexteUser) {
    case "serveur":
      content = <Serveur IDServeur={contexte.contexteID} />;
      break;
    case "groupe":
      content = <Groupe IDGroupe={contexte.contexteID} />;
      break;
    case "MP":
      content = <MessagePrv IDMP={contexte.contexteID} />;
      break;
    case "profil":
      content = <Profil />;
      break;
    case "param":
      content = <Param />;
      break;
    default:
      content = null;
      break;
  }

  return <>{content}</>;
};

export default Content;
