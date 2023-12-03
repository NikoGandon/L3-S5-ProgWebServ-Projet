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
};

const httpsServer = https.createServer(optionsSSL, app);

httpsServer.listen(process.env.PORT, () => {
  console.log("HTTPS Server running on port " + process.env.PORT);
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
const registerRoute = require("./Route/User/Authentification/register");
const loginRoute = require("./Route/User/Authentification/login");
const GoogleOAuthRoute = require("./Route/User/Authentification/OAuth2/Google.OAuth2");

app.use("/", homeRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/auth/google", GoogleOAuthRoute);
