import React ,{useState} from "react";
import axios from "../../utils/axiosConf";

const Param = () => {
  const [identifier, setidentifier] = useState("");
  const [email, setemail] = useState(null);
  const [bio, setbio] = useState(null);

  const handleidentifierChange = (event) => {
    setidentifier(event.target.value);
  };
  const handleemailChange = (event) => {
    setemail(event.target.value);
  };
  const handlebioChange = (event) => {
    setbio(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("https://localhost:3000/User", {
        username: identifier,
        email: email,
        bio: bio
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
      <label htmlFor="identifier">new identifiant</label>
        <input
          type="identifier"
          id="identifier"
          value={identifier}
          onChange={handleidentifierChange}
        />
        <button type="submit">Valider</button>
      </form>
    </>
  );
};

export default Param;
