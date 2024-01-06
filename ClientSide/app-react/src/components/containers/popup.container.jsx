import React, { useContext } from "react";

import PopUp from "../pop-up/pop-up.model";
import { PopupContext } from "../../contexts/popup.context";

const PopUpContainer = () => {
  const { contextePopup } = useContext(PopupContext);

  return <>{contextePopup.popup && <PopUp />}</>;
};

export default PopUpContainer;
