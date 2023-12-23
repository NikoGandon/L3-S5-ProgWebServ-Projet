import { React, useState } from "react";

/**
 * @desc Formulaire d'inscription
 *
 */

const Regiter = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmationChange = (event) => {
    setConfirmation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, confirmation);
  };

  return (
    <>
      <h1>Inscription</h1>
      <form class="formsAuth" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange}/>
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
        <label htmlFor="confirmation">Confirmation</label>
        <input type="password" id="confirmation" name="confirmation" value={confirmation} onChange={handleConfirmationChange}/>
        <button type="submit">S'inscrire</button>
      </form>
    </>
  );
};

export default Regiter;
