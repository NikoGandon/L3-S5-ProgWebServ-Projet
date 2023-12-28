import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";

import Serveur from "../../serveur/serveur";
import Groupe from "../../groupe/groupe";
import MessagePrv from "../../MP/mp";

const Content = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Outlet />} >
          <Route path="serveur" element={<Serveur />} />
          <Route path="groupe" element={<Groupe />} />
          <Route path="MP" element={<MessagePrv />} />
        </Route>
      </Routes>
      <h1>Content</h1>
    </>
  );
};

export default Content;
