import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import Login from "./login";
import Register from "./regiter";
import OAuth2 from "./OAuth2";
import LoginSuccess from "./loginSuccess";

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
        <Route path="/" exact element={<Outlet />} />
        <Route path="/success" element={<LoginSuccess/>} />
        <Route path="/failed">
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
