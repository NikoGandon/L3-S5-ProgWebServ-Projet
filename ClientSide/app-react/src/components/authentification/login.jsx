import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import axios from "../../utils/axiosConf";
import Cookies from "universal-cookie";

/**
 * @desc Formulaire de connexion
 *
 */

const Login = () => {
  const [identifier, setidentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [register, setRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleidentifierChange = (event) => {
    setidentifier(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const registerHandler = () => {
    setRegister(true);
  };

  /**
   * @desc Envoie du formulaire de connexion et récupération du token dans un cookie
   * @param {*} event 
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://localhost:3000/auth/login", {
        username: identifier,
        password: password,
      })
      .then((response) => {
        if (response.data.authStatus) {
          window.location.reload(true);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête:", error);
        setError(error.response.data.error);
        if (error.response) {
          console.error("Réponse du serveur:", error.response.data);
        }
      });
  };

  return (
    <>
      {isLogged ? <Navigate to="/" /> : null}
      <div id="LoginRegister">
        <div id="contentLoginRegister">


      <h2>Connexion</h2>
      <form className="formsAuth" onSubmit={handleSubmit}>
        <input
          className="input"
          type="identifier"
          id="identifier"
          placeholder="Identifiant"
          value={identifier}
          onChange={handleidentifierChange}
        />
        <p></p>
        <input
          className="input"
          type="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <p></p>
        <button type="submit" id="submitButton">Se connecter</button>
      </form>
      </div>
      </div>
    </>
  );
};

export default Login;
