require("dotenv").config();
const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const optionsSSL = {
  key: fs.readFileSync("./ServeurFolder/SSL_Certificat/private-key.pem"),
  cert: fs.readFileSync("./ServeurFolder/SSL_Certificat/certificate.pem"),
  ca: fs.readFileSync("./ServeurFolder/SSL_Certificat/csr.pem"),
};

app.enable("trust proxy");

app.use(function (req, res, next) {
  if (!req.secure) {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});

app.use(
  session({
    secret: "coucou",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const homeRoute = require("./Route/home");
const UserRoute = require("./Route/User/User");
const ServeurRoute = require("./Route/Serveur/Serveur");
const GroupeRoute = require("./Route/Groupe/Groupe");

app.use("/", homeRoute);
app.use("/User", UserRoute);
app.use("/Serveur", ServeurRoute);
app.use("/Groupe", GroupeRoute);

const httpsServer = https.createServer(optionsSSL, app);
const HTTPS_PORT = process.env.PORT;

httpsServer.listen(HTTPS_PORT, () => {
  console.log("HTTPS Server running on port " + HTTPS_PORT);
});

httpsServer.on("error", (error) => {
  console.error("Erreur du serveur HTTPS:", error);
});
