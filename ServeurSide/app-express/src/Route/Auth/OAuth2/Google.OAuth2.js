const routerGoogleAuth = require("express").Router();

const { createToken } = require("../../../Middleware/AuthToken");
const passportGoogleAuth = require("../../../Middleware/Passport/passportOAuth2");

routerGoogleAuth.get(
  "/",
  passportGoogleAuth.authenticate("googleOAuth", {
    scope: ["profile", "email"],
  })
);

routerGoogleAuth.get("/callback", (req, res, next) => {
  passportGoogleAuth.authenticate("googleOAuth", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ error: info.message });
    }

    const token = createToken(user);
    console.log("token : " + token);
    return res
      .status(200)
      .cookie(
        "authToken",
        token,
        { httpOnly: true, secure: true, sameSite: "none" }
      )
      .json({ message: "Connexion réussi" });
  })
);

routerGoogleAuth.get("/failed", (req, res) => {
  return res.status(401).json({
    error: "Echec de l'authentification",
  });
});

routerGoogleAuth.get("/connected", (req, res) => {
  return res.status(200).json({
    message: "Connexion réussi",
  });
});

module.exports = routerGoogleAuth;
