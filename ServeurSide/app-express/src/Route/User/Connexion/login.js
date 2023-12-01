const express = require("express");
const routerLogin = express.Router();

const passportLogin = require("../../../Middleware/Passport/passportLogin");

routerLogin.post("/", (req, res) => {
  if (!req.body.identifier || !req.body.password) {
    res.status(400).json({
      message: "Veuillez remplir tous les champs",
    });
  }
  try {
    passportLogin.authenticate(
      "passportLogin",
      {
        identifier: req.body.identifier,
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

        return res.status(200).json({
          message: info.message,
        });
      }
    )(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

module.exports = routerLogin;
