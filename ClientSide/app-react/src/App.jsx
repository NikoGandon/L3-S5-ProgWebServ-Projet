import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./App.css";

import Authentication from "./components/authentification/authentication";
import Home from "./components/Home/home";

const elem = <h1>Bienvenue sur le site XXXX</h1>;

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const estConnecte = token !== null;
  if (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 < new Date().getTime()) {
      localStorage.removeItem("token");
      setToken(null);
    }
  }

  return <>{estConnecte ? <Home /> : <Authentication />}</>;
}

export default App;
