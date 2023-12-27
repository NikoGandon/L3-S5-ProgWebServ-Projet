const express = require("express");
const routerRegister = express();

const passportRegister = require("../../Middleware/Passport/passportRegister");

routerRegister.post("/", (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).json({
      message: "Veuillez remplir tous les champs",
    });
  }

  try {
    passportRegister.authenticate(
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

        if (!user) {
          return res.status(202).json({
            error: info.message,
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

module.exports = routerRegister;
