import React, { useRef, useEffect, useContext } from 'react';
import { usePopup } from '../../contexts/popup.context';
import { UserContext } from '../../contexts/user.context';

const Popup = () => {
  const { showPopup, popupComponent, closePopup } = usePopup();
  const popupRef = useRef();

  const { contexteUser, contexteID } = useContext(UserContext);

  useEffect(() => {

    console.log("-----------------")
    console.log('contexteUser', contexteUser);
    console.log('contexteID', contexteID);
    console.log("-----------------")

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closePopup]);

  return showPopup ? (
    <div className="popup-bg">
    <div className="popup-container">
      <div className="popup-content" ref={popupRef}>
        {popupComponent}
        <button onClick={closePopup} className="popup-close">Fermer</button>
      </div>
      </div>
    </div>
  ) : null;
};

export default Popup;