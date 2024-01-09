import React, { useState } from "react";
import axios from "../../utils/axiosConf";

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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://localhost:3000/auth/register",
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
      <h2>Inscription</h2>
      {error ? <p className="error">{error}</p> : null}
      <form className="formsAuth" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          className="input"
          name="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={handleUsernameChange}
        />
        <p></p>
        <input
          type="email"
          id="email"
          className="input"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <p></p>
        <input
          type="password"
          className="input"
          id="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <p></p>
        <button type="submit" id="submitButton">S'inscrire</button>
      </form>
    </>
  );
};

export default Regiter;
