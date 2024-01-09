import React, { useRef, useEffect } from 'react';
import { usePopup } from '../../contexts/popup.context';

const Popup = () => {
  const { showPopup, popupComponent, closePopup } = usePopup();
  const popupRef = useRef();

  useEffect(() => {
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
    <div className="popup-container">
      <div className="popup-content" ref={popupRef}>
        <p>Contenu de la fenêtre pop-up :</p>
        {popupComponent}
        <button onClick={closePopup}>Fermer</button>
      </div>
    </div>
  ) : null;
};

export default Popup;