import React, { createContext, useState } from "react";

const UserContext = createContext({
  contexteUser: "accueil",
  contexteID: null,
  contexteSalon: null,
  handleServeurSelect: () => {},
  handleGroupeSelect: () => {},
  handleParam: () => {},
  handleProfil: () => {},
  handleRevenirAccueil: () => {},
  handleAmis: () => {},
  updateContext: () => {},
  handleParamServeur: () => {},
});

const ContextUserProvider = (props) => {
  const [context, setContext] = useState({
    contexteUser: "accueil",
    contexteID: null,
    contexteSalon: null,
  });

  function handleServeurSelect(idServeur, idSalon = null) {
    setContext({
      contexteUser: "serveur",
      contexteID: idServeur,
      contexteSalon: idSalon,
    });
  }

  function handleGroupeSelect(id) {
    setContext({ contexteUser: "groupe", contexteID: id });
  }

  function handleParam() {
    setContext({ contexteUser: "param", contexteID: null });
  }

  function handleProfil() {
    setContext({ contexteUser: "profil", contexteID: null });
  }

  function handleAmis() {
    setContext({ contexteUser: "amis", contexteID: null });
  }

  const handleRevenirAccueil = () => {
    setContext({ contexteUser: "accueil", contexteID: null });
  };

  const handleParamServeur = () => {
    setContext({ contexteUser: "paramserveur", contexteID: null });
  };

  const updateContext = {
    contexteUser: context.contexteUser,
    contexteID: context.contexteID,
    contexteSalon: context.contexteSalon,
    serveurs: context.serveurs,
    handleServeurSelect,
    handleGroupeSelect,
    handleParam,
    handleProfil,
    handleRevenirAccueil,
    handleAmis,
    updateContext: setContext,
    handleParamServeur,
  };

  return (
    <UserContext.Provider value={updateContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, ContextUserProvider };
