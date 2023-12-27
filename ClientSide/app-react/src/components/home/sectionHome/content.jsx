import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";

import Home from "../home";
import Serveur from "../../serveur/serveur";
import Groupe from "../../groupe/groupe";
import MessagePrv from "../../MP/mp";

const Content = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />} />
        <Route path="/serveur" element={<Serveur />} />
        <Route path="/groupe" element={<Groupe />} />
        <Route path="/MP" element={<MessagePrv />} />
      </Routes>
      <h1>Content</h1>
    </>
  );
};

export default Content;
