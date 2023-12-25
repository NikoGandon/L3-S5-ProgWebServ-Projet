import React, { useState } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';

/**
 * @desc Formulaire d'inscription
 *
 */

const Regiter = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [login, setLogin] = useState(false);

  const handleUsernameChange = (event) => {
    setusername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = () => {
    setLogin(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://127.0.0.1:3000/auth/register",
        {
          username: username,
          email: email,
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
        setMessage(response.data.message);
        setError(response.data.error);

      })
      .catch((error) => {
        console.error("Erreur lors de la requête:", error);
        if (error.response) {
          console.error("Réponse du serveur:", error.response.data);
        }
      });
  };

  if (message) {
    return <p className="message">{message}</p>;
  }

  return (
    <>
      <h1>Inscription</h1>
      {error ? <p className="error">{error}</p> : null}
      <form className="formsAuth" onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">S'inscrire</button>
      </form>
      <button onClick={loginHandler}>
        J'ai déjà un compte
      </button>
      {login ? <Navigate to="/auth/login" /> : null}
    </>
  );
};

export default Regiter;
