const express = require("express");
const routerRegister = express.Router();

routerRegister.get("/", (req, res) => {
  res.send("Register page");
});
