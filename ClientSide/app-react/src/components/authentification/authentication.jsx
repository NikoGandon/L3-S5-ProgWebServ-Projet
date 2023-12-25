import React, { useState } from "react";

import Login from "./login";
import Regiter from "./regiter";
import OAuth2 from "./OAuth2";

import { GoogleOAuthProvider } from "@react-oauth/google";

/**
 * @desc Formulaire de connexion ou d'inscription avec un bouton pour switcher entre les deux et un bouton pour se connecter avec Google
 * @returns Bouton OAuth2 avec le formulaire de connexion ou le formulaire d'inscription
 */
export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <Login onSwitch={handleSwitch} />
      ) : (
        <Regiter onSwitch={handleSwitch} />
      )}
      <GoogleOAuthProvider clientId="683358252215-to6amlqd2qgr0rvq1629fn2g447luq2q.apps.googleusercontent.com">
        <OAuth2 />
      </GoogleOAuthProvider>
    </div>
  );
}
