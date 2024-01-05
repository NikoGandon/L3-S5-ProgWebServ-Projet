import React, { createContext, useState } from "react";

const UserContext = createContext({
  contexteUser: "accueil",
  contexteID: null,
  contexteSalon: null,
  handleServeurSelect: () => {},
  handleMPSelect: () => {},
  handleGroupeSelect: () => {},
  handleParam: () => {},
  handleRevenirAccueil: () => {},
  updateContext: () => {},
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

  function handleMPSelect(id) {
    setContext({ contexteUser: "MP", contexteID: id });
  }

  function handleGroupeSelect(id) {
    setContext({ contexteUser: "groupe", contexteID: id });
  }

  function handleParam() {
    setContext({ contexteUser: "param", contexteID: null });
  }

  const handleRevenirAccueil = () => {
    setContext({ contexteUser: "accueil", contexteID: null });
  };

  const updateContext = {
    contexteUser: context.contexteUser,
    contexteID: context.contexteID,
    contexteSalon: context.contexteSalon,
    serveurs: context.serveurs,
    handleServeurSelect,
    handleMPSelect,
    handleGroupeSelect,
    handleParam,
    handleRevenirAccueil,
    updateContext: setContext,
  };

  return (
    <UserContext.Provider value={updateContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, ContextUserProvider };
