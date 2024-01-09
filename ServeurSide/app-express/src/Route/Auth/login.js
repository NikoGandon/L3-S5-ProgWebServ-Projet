const routerLogin = require("express").Router();

const passportLogin = require("../../Middleware/Passport/PassportLogin");
const { createToken } = require("../../Middleware/AuthToken");

routerLogin.post("/", async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: "Veuillez remplir tous les champs",
    });
  }
  try {
    passportLogin.authenticate(
      "passportLogin",
      {
        username: req.body.username,
        password: req.body.password,
      },
      async (err, user, info) => {
        try {
          if (err) {
            console.log("err : " + err);
            return res.status(400).json({
              authStatus: false,
              error: err,
            });
          }

          if (!user) {
            console.log("mess : " + info.message);
            return res.status(400).json({
              authStatus: false,
              message: info.message,
            });
          }

          const token = createToken(user);

          let dateExpiration = new Date();
          dateExpiration = dateExpiration.setDate(
            dateExpiration.getMonth() + 6
          );

          return res
            .cookie("authToken", token, {
              domain: "localhost",
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "None",
              maxAge: dateExpiration,
            })
            .json({
              authStatus: true,
              message: "Authentification réussi",
            });
        } catch (error) {
          console.log(error);
        }
      }
    )(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

module.exports = routerLogin;
