import React from "react";

import Serveur from "../../serveur/serveur";
import Groupe from "../../groupe/groupe";
import MessagePrv from "../../MP/mp";
import Profil from "../../user/profil";
import Param from "../../user/param.jsx";

const Content = ({ typeContent, IDContent }) => {
  let content = null;

  switch (typeContent) {
    case "serveur":
      content = <Serveur IDServeur={IDContent} />;
      break;
    case "groupe":
      content = <Groupe IDGroupe={IDContent} />;
      break;
    case "MP":
      content = <MessagePrv IDMP={IDContent} />;
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
