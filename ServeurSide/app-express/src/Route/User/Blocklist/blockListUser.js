const express = require("express");
const blocklistRouteur = express.Router();

blocklistRouteur.get("/", (req, res) => {
  res.send("blocklist page");
});

blocklistRouteur.post("/", (req, res) => {
  res.send("Blocage d'un utilisateur");
});

blocklistRouteur.delete("/", (req, res) => {
  res.send("Déblocage d'un utilisateur");
});

module.exports = blocklistRouteur;