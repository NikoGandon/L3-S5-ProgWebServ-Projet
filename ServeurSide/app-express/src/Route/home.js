const express = require("express");
const routerHome = express.Router();

const { checkToken, verifyToken, verifyAdminToken } = require("../Middleware/AuthToken");
const routerUser = require("./User/User");
const routerSupAdmin = require("./Administrateur/administrateur");
const routerAuth = require("./Auth/Auth");

routerHome.get("/", (req, res) => {
  const token = checkToken(req);

  if (token === -1) {
    return res.redirect("/Auth");
  }

  if (token === 0) {
    return res.redirect("/AccueilUser");
  }

  res.status(200).json({ message: "Accès autorisé." });
});

routerHome.use("/AccueilUser", verifyToken, routerUser);
routerHome.use("/AccueilAdmin", verifyAdminToken, routerSupAdmin);
routerHome.use("/Auth", routerAuth);

module.exports = routerHome;