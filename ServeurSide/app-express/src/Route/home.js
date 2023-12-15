const express = require("express");
const routerHome = express.Router();

const { checkToken } = require("../Middleware/AuthToken");

routerHome.get("/", (req, res) => {
  const token = checkToken(req);
  if (token === -1) {
    return res.status(200).json({ message: "Accès aux non connecté." });
  }

  if (token === 0) {
    return res
      .status(200)
      .json({ message: "Accès aux utilisateurs non administrateur." });
  }

  res.status(200).json({ message: "Accès autorisé." });
});

module.exports = routerHome;
