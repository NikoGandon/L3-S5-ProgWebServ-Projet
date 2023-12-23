import { React, useState } from "react";

/**
 * @desc Formulaire de connexion
 *
 */

const Login = () => {
  const [identifier, setidentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleidentifierChange = (event) => {
    setidentifier(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: identifier, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.jwt);
      })
      .catch((error) => {
        console.error(error);
    });
  };

  return (
    <>
      <h1>Connexion</h1>
      <form className="formsAuth" onSubmit={handleSubmit}>
        <label htmlFor="identifier">identifiant</label>
        <input
          type="identifier"
          id="identifier"
          name="identifier"
          value={identifier}
          onChange={handleidentifierChange}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Se connecter</button>
      </form>
    </>
  );
};

export default Login;
