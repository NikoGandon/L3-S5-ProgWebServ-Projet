import React, { useEffect, useContext } from "react";

import axios from "../../utils/axiosConf";
import { UserContext } from "../../contexts/user.context";

/**
 * @desc Affiche l'interface d'un message privé (liste des messages ainsi que le nom de l'interlocuteur)
 */
const MessagePrv = () => {
  const { contexteID } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("https://localhost:3000/MP/", {
        params: {
          id: contexteID,
        },
      })
      .then((res) => {});
  }, []);

  return (
    <>
      <h1>MessagePrv</h1>
    </>
  );
};

export default MessagePrv;
