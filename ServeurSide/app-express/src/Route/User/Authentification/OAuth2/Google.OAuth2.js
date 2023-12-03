const routerGoogleAuth = require("express").Router();

const passportGoogleAuth = require("../../../../Middleware/Passport/passportOAuth2");

routerGoogleAuth.get(
  "/",
  passportGoogleAuth.authenticate("googleOAuth", {
    scope: ["profile", "email"],
  })
);

routerGoogleAuth.get(
  "/callback",
  passportGoogleAuth.authenticate("googleOAuth", {
    failureRedirect: "/auth/google/failed",
    successRedirect: "/auth/google/connected",
  })
);

routerGoogleAuth.get("/auth/google/failed", (req, res) => {
  res.status(401).json({
    message: "Echec de l'authentification",
  });
});

routerGoogleAuth.get("/connected", (req, res) => {
  res.status(200).json({
    message: "Connexion réussi",
  });
});

module.exports = routerGoogleAuth;
