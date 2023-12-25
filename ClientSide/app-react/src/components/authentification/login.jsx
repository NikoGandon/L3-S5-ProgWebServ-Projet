import { React, useState } from "react";
import { Navigate } from 'react-router-dom';

import axios from "axios";

/**
 * @desc Formulaire de connexion
 *
 */

const Login = () => {
  const [identifier, setidentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [register, setRegister] = useState(false);

  const handleidentifierChange = (event) => {
    setidentifier(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const registerHandler = () => {
    setRegister(true);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://127.0.0.1:3000/auth/login",
        {
          username: identifier,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Données reçues avec succès:", response.data);
        localStorage.setItem("token", response.data.token);
        setIsLogged(true); 
      })
      .catch((error) => {
        console.error("Erreur lors de la requête:", error);
        if (error.response) {
          console.error("Réponse du serveur:", error.response.data);
        }
      });
  };


  return (
    <>
      {
        isLogged ? (
          <Navigate to="/accueil" />
        ) : null
      }
      <h1>Connexion</h1>
      <form className="formsAuth" onSubmit={handleSubmit}>
        <label htmlFor="identifier">identifiant</label>
        <input
          type="identifier"
          id="identifier"
          value={identifier}
          onChange={handleidentifierChange}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Se connecter</button>
      </form>
      <button onClick={registerHandler}>
        Je n'ai pas de compte
      </button>
      {register ? <Navigate to="/auth/register" /> : null}
    </>
  );
};

export default Login;
