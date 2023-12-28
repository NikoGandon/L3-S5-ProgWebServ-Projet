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

  const setLogin = (val) => {
    setIsLogin(val);
  };

  return (
    <>
      <Routes>
        <Route path="/success" element={<LoginSuccess />} />
        <Route path="*" element={
          <Outlet>
            <Route path="login" element={<Login onSwitch={() => setLogin(true)} />} />
            <Route path="register" element={<Register onSwitch={() => setLogin(false)} />} />
            <Route path="*" element={<Login onSwitch={() => setLogin(true)} />} />
          </Outlet>
        }/>
      </Routes>
      <div>
        {isLogin ? (
          <Login onSwitch={handleSwitch} />
        ) : (
          <Register onSwitch={handleSwitch} />
        )}
        <button onClick={handleSwitch}> {isLogin ? ("Je n'ai pas de compte") : ("J'ai un compte")} </button>
        <OAuth2 />
      </div>
    </>
  );
}
