const express = require("express");
const routerLogin = express.Router();

const passportLogin = require("../../Middleware/Passport/PassportLogin");
const { createToken } = require("../../Middleware/AuthToken");

routerLogin.post("/", (req, res, next) => {
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
      (err, user, info) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(400).json({
            message: info.message,
          });
        }

        const token = createToken(user);

        return res.status(200).json({token});
      }
    )(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

module.exports = routerLogin;
