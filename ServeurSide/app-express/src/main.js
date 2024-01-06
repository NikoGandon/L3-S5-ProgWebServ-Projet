require("dotenv").config();
const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

const { verifyToken, verifyAdminToken } = require("./Middleware/AuthToken");

app.enable("trust proxy");

app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

app.use(cookieParser());

const optionsSSL = {
  key: fs.readFileSync("./ServeurFolder/SSL_Certificat/private-key.pem"),
  cert: fs.readFileSync("./ServeurFolder/SSL_Certificat/certificate.pem"),
  ca: fs.readFileSync("./ServeurFolder/SSL_Certificat/csr.pem"),
};

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
const AuthRoute = require("./Route/Auth/Auth");
const UserRoute = require("./Route/User/User");
const ServeurRoute = require("./Route/Serveur/serveur");
const GroupeRoute = require("./Route/Groupe/groupe");
const MPRoute = require("./Route/MessagePrive/messageprive");

app.use("/", homeRoute);
app.use("/Auth", AuthRoute);
app.use("/User", verifyToken, UserRoute);
app.use("/Serveur", verifyToken, ServeurRoute);
app.use("/Groupe", verifyToken, GroupeRoute);
app.use("/MP", verifyToken, MPRoute);

const httpsServer = https.createServer(optionsSSL, app);
const HTTPS_PORT = process.env.PORT;

const { socketConfig } = require("./Config/ioSocket");

const io = new Server(httpsServer, socketConfig);

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, () => {
    const authToken = socket.request.cookies.authToken;

    socket.data.userId = authToken;

    if (authToken) {
      return next();
    } else {
      return next(new Error("Authentication failed."));
    }
  });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("clientConnection", () => {
    console.log("Client has connected");
  });

  handleGroupeMessage(socket);
  handleSalonMessage(socket);
});

httpsServer.listen(HTTPS_PORT, () => {
  console.log("HTTPS Server running on port " + HTTPS_PORT);
});

httpsServer.on("error", (error) => {
  console.error("Erreur du serveur HTTPS:", error);
});
