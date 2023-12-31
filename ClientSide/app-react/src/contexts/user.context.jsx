import React, { createContext, useState } from "react";

const UserContext = createContext({
  contexteUser: "accueil", // accueil, serveur, groupe, MP, param
  contexteID: null,        // ID du serveur, groupe, MP
  updateContexte: () => {}, // Fonction pour changer le contexte
});

const ContextUserProvider = (props) => {
  const [context, setContext] = useState({
    contexteUser: "accueil",
    contexteID: null,
  });

  function handleServeurSelec(id) {
    setContext({contexteUser: "serveur", contexteID: id});
  }

  function handleMPSelec(id) {
    setContext({contexteUser: "MP", contexteID: id});
  }

  function handleGroupeSelec(id) {
    setContext({contexteUser: "groupe", contexteID: id});
  }

  /**
   * @info Paramètre utilisateur ne peut s'atteindre que depuis l'accueil
   *
   */

  function handleParam() {
    setContext({contexteUser: "param", contexteID: null});
  }

  const handleRevenirAccueil = () => {
    setContext({contexteUser: "accueil", contexteID: null});
  };

  const updateContext = {
    contexteUser: context.contexteUser,
    contexteID: context.contexteID,
    updateContext: setContext
  };

  return (
    <UserContext.Provider value={updateContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, ContextUserProvider };
