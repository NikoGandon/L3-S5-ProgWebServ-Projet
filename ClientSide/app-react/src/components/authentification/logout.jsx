import React from "react";
import axios from "../../utils/axiosConf";

const Logout = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const response = await axios.get("https://localhost:3000/auth/logout");

      if (response.status === 200) {
        console.log("Vous vous êtes déconnecté");
        window.location.reload();
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <>
      <form className="formsLogout" onSubmit={handleSubmit}>
        <button type="submit">Déconnexion</button>
      </form>
    </>
  );
};

export default Logout;
