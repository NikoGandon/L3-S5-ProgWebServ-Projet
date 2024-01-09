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
    <div id="zoneParam">
    <div id="arrierePlanFlou">
        <div id="contenuParam">
      <h2>Paramètres</h2>
      <form className="formsParam" onSubmit={handleSubmit}>
        <input
          className="input_param"
          type="identifier"
          id="identifier"
          placeholder="Nouveau Pseudo"
          value={identifier}
          onChange={handleidentifierChange}
        /><br></br>
        <input
          className="input_param"
          type="email"
          id="email"
          placeholder="Nouveau Email"
          value={email}
          onChange={handleemailChange}
        /><br></br>
        <input
          className="input_param"
          type="bio"
          id="bio"
          placeholder="Nouvelle biographie"
          value={bio}
          onChange={handlebioChange}
        /><br></br>
        <input
          className="input_param"
          type="password"
          id="password"
          placeholder="Nouveau Mot de passe"
          value={code}
          onChange={handleCodeChange}
        /><br></br>
        <button type="submit" className="submit_param">Valider</button>
      </form>
      </div>
      </div>
      </div>
    </>
  );
};

export default Param;
