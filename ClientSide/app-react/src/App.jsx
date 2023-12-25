import { useState } from "react";
import { jwtDecode } from "jwt-decode";

import "./App.css";

import HomeUnconnected from "./components/home/homeUnconnected";
import Home from "./components/Home/home";
import Authentication from "./components/authentification/authentication";
import Login from "./components/authentification/login";
import Register from "./components/authentification/regiter";

const elem = <h1>Bienvenue sur le site XXXX</h1>;

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log("token stocké  : " + token);
  const estConnecte = token !== null;
  if (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 < new Date().getTime()) {
      localStorage.removeItem("token");
      setToken(null);
    }
  }

  return <>{estConnecte ? <Home /> : <HomeUnconnected />}</>;
}
export default App;
