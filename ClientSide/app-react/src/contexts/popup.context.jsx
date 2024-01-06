import React, { useState, createContext } from "react";

export const PopupContext = createContext(
  {
    contextePopup: {
      popup: false,
    },
    openPopup: () => {},
    closePopup: () => {},
    handlePopup: () => {},
  },
  () => {}
);

const ContextPopUpProvider = (props) => {
  const [contextePopup, setContextePopup] = useState({
    popup: false,
  });

  const openPopup = () => {
    setContextePopup((prevState) => ({
      popup: true,
    }));
  };

  const closePopup = () => {
    setContextePopup((prevState) => ({
      popup: false,
    }));
  };

  const handlePopup = (popup) => {
    setContextePopup({
      popup: popup,
    });
  };

  return (
    <PopupContext.Provider
      value={{ contextePopup, openPopup, closePopup, handlePopup }}
    >
      {props.children}
    </PopupContext.Provider>
  );
};

export default ContextPopUpProvider;
