const express = require("express");
const friendRouteur = express.Router();

friendRouteur.get("/", (req, res) => {
  res.send("friend page");
});

friendRouteur.post("/", (req, res) => {
  res.send("Création d'un ami");
});

friendRouteur.delete("/", (req, res) => {
  res.send("Suppression d'un ami");
});

module.exports = friendRouteur;