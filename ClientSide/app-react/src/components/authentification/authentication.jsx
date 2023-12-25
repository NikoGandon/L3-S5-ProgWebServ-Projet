import React, { useState } from "react";

import Login from "./login";
import Regiter from "./regiter";



/**
 * @desc Formulaire de connexion ou d'inscription avec un bouton pour switcher entre les deux et un bouton pour se connecter avec Google
 * @returns Bouton OAuth2 avec le formulaire de connexion ou le formulaire d'inscription
 */
export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleGoogle = () => { 
    const newWindow = window.open('https://localhost:3000/auth/OAuth/', '_blank');
  };

  return (
    <div>
      {isLogin ? (
        <Login onSwitch={handleSwitch} />
      ) : (
        <Regiter onSwitch={handleSwitch} />
      )}

      <button id="connectGoogle" onClick={handleGoogle}>Se connecter avec google  </button>
        
    </div>
  );
}
