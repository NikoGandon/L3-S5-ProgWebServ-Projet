const express = require('express');
const routerUser = express();

const login = require('./Authentification/login');
const register = require('./Authentification/register');
const OAuth = require('./Authentification/OAuth2/Google.OAuth2');

routerUser.post('/login', login);
routerUser.post('/register', register);
// ? - - routerUser.get('/OAuth/Google', OAuth);



module.exports = routerUser;