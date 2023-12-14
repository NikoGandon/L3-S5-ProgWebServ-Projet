require("dotenv").config();
const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");

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
<<<<<<< ce45284e130a8761ee317f4d3f4cd16d405ce5f5
const ServeurRoute = require("./Route/Serveur/Serveur");
=======
const ServeurRoute = require("./Route/Serveur/serveur");
>>>>>>> 27ef0bbf0590f562c9d63400e3d1b8f1a7062305
const GroupeRoute = require("./Route/Groupe/groupe");

app.use("/", homeRoute);
app.use("/User", UserRoute);
app.use("/Serveur", ServeurRoute);
app.use("/Groupe", GroupeRoute);

const httpsServer = https.createServer(optionsSSL, app);
const HTTPS_PORT = process.env.PORT;

const io = socketIO(httpsServer);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpsServer.listen(HTTPS_PORT, () => {
  console.log("HTTPS Server running on port " + HTTPS_PORT);
});

httpsServer.on("error", (error) => {
  console.error("Erreur du serveur HTTPS:", error);
});
