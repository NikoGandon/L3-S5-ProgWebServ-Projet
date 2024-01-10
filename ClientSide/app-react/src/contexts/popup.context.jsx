import React, { createContext, useContext, useState } from 'react';
import { UserContext } from './user.context';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupComponent, setPopupComponent] = useState(null);

  const { contextUser, contexteID } = useContext(UserContext);

  const openPopup = (component) => {
    console.log('contextUser', contextUser);
    console.log('contexteID', contexteID);
    setPopupComponent(component);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupComponent(null);
  };

  return (
    <PopupContext.Provider value={{ showPopup, popupComponent, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
