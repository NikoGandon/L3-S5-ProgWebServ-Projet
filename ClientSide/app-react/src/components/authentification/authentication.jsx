import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

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

  return (
    <>
      <Routes>
        <Route path="/auth" exact element={<Outlet />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route exact path="/auth/login/success" element={<LoginSuccess />} />
        <Route path="/auth/login/failed">
          Error loging in. Please try again later!
        </Route>
      </Routes>
      <div>
        {isLogin ? (
          <Login onSwitch={handleSwitch} />
        ) : (
          <Regiter onSwitch={handleSwitch} />
        )}

        <OAuth2 />
      </div>
    </>
  );
}
