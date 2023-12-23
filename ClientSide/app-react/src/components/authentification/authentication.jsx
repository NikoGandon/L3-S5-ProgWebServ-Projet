import { React, useState } from "react";

import Login from "./login";
import Regiter from "./regiter";
import OAuth2 from "./OAuth2";

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
    // TODO
  };

  return (
    <div>
      {isLogin ? (
        <Login onSwitch={handleSwitch} onLogin={handleLogin} />
      ) : (
        <Regiter onSwitch={handleSwitch} onRegister={handleRegister} />
      )}
      <button type="button" onClick={handleSwitch}>
        {isLogin ? "Je n'ai pas de compte" : "J'ai un compte"}
      </button>
    </div>
  );

}
