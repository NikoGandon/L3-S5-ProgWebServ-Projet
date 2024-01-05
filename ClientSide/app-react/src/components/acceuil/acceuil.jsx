import React , {useContext} from "react";
import { UserContext} from "../../contexts/user.context";

const Acceuil = () => {
    const { handleParam } = useContext(UserContext);
  return (
    <>
      <h1>Acceuil</h1>
      <div className="button_param" onClick={()=>{handleParam()}}>
        <img src="../../../images/plus.png" alt="Param" />
      </div>
    </>
  );
};

export default Acceuil;
