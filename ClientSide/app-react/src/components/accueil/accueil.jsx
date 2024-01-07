import React , {useContext} from "react";
import { UserContext} from "../../contexts/user.context";

const Accueil = () => {
    const { handleParam } = useContext(UserContext);
  return (
    <>
      <h1>Accueil</h1>
      <div className="button_param" onClick={()=>{handleParam()}}>
        <img src="../../public/image/serverLogfo.png" alt="Param" />
      </div>
    </>
  );
};

export default Accueil;
