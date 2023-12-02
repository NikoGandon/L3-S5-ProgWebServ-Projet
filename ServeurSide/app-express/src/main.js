require("dotenv").config()
const express = require("express")
const app = express()

// routes
const homeRoute = require("./Route/home")
const registerRoute = require("./Route/User/Authentification/register")
const loginRoute = require("./Route/User/Authentification/login")

app.listen(process.env.PORT, () => {
    console.log(`Serveur lancé sur le port ${process.env.PORT}`)
    }
); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
