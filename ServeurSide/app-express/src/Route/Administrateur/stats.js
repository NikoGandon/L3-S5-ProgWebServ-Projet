const express = require("express");
const routerStats = express.Router();

const { checkToken, verifyAdminToken } = require("../../Middleware/AuthToken");

routerStats.get("/", (req, res) => {
  return res.status(200).json({
    message: "route stats non terminée.",
  });
});

module.exports = routerStats;
