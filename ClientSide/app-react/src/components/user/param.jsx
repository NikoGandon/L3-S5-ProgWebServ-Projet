import React ,{useState} from "react";
import axios from "../../utils/axiosConf";

const Param = () => {
  const [identifier, setidentifier] = useState(null);
  const [email, setemail] = useState(null);
  const [bio, setbio] = useState(null);
  const [code, setCode] = useState(null);

  const handleidentifierChange = (event) => {
    setidentifier(event.target.value);
  };
  const handleemailChange = (event) => {
    setemail(event.target.value);
  };
  const handlebioChange = (event) => {
    setbio(event.target.value);
  };
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("https://localhost:3000/User", {
        username: identifier,
        email: email,
        bio: bio,
        password: code
      })
      .then((response) => {
        window.location.reload(true);
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
      <h1>Param-User</h1>
      <form className="formsParam" onSubmit={handleSubmit}>
      <label htmlFor="identifier">Nouveau Pseudo: </label>
        <input
          type="identifier"
          id="identifier"
          value={identifier}
          onChange={handleidentifierChange}
        /><br></br>
      <label htmlFor="email">Nouveau Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleemailChange}
        /><br></br>
      <label htmlFor="bio">Nouvelle bio: </label>
        <input
          type="bio"
          id="bio"
          value={bio}
          onChange={handlebioChange}
        /><br></br>
      <label htmlFor="password">Nouveau Code: </label>
        <input
          type="password"
          id="password"
          value={code}
          onChange={handleCodeChange}
        /><br></br>
        <button type="submit">Valider</button>
      </form>
    </>
  );
};

export default Param;
