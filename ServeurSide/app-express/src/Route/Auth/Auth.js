const express = require("express");
const routerAuth = express();

const login = require("./login");
const register = require("./register");
const OAuth = require("./OAuth2/Google.OAuth2");
const logout = require("./logout");

routerAuth.use("/login", login);
routerAuth.use("/register", register);
routerAuth.use("/logout", logout);
routerAuth.use("/OAuth", OAuth);

module.exports = routerAuth;