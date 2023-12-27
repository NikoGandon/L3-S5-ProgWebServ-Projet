const routerGoogleAuth = require("express").Router();

const { createToken } = require("../../../Middleware/AuthToken");
const passportGoogleAuth = require("../../../Middleware/Passport/passportOAuth2");
const session = require("express-session");

routerGoogleAuth.use(
  session({
    secret: "coucou",
    resave: false,
    saveUninitialized: false,
  })
);

routerGoogleAuth.get(
  "/",
  passportGoogleAuth.authenticate("googleOAuth", {
    scope: ["profile", "email"],
  })
);

routerGoogleAuth.get("/callback", (req, res, next) => {
  passportGoogleAuth.authenticate(
    "googleOAuth",
    {
      failureRedirect: "http://localhost:5173/auth/login/failed",
    },
    (err, user, info) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: err,
        });
      }
      console.log("User connected")

      if (!user) {
        console.log(info.message);
        return res.status(400).json({
          message: info.message,
        });
      }

      const token = createToken(user);

      let dateExpiration = new Date();
      dateExpiration = dateExpiration.setDate(dateExpiration.getMonth() + 6);

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: dateExpiration,
      });


      return res.redirect("http://localhost:5173/auth/login/success");
    }
  )(req, res, next);
});

module.exports = routerGoogleAuth;
