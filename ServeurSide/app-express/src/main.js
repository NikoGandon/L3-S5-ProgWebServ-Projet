const bodyParser = require("body-parser");

const optionsSSL = {
    key: fs.readFileSync("./ServeurFolder/SSL_Certificat/private-key.pem"),
    cert: fs.readFileSync("./ServeurFolder/SSL_Certificat/certificate.pem")
}

https.createServer(optionsSSL, app).listen(process.env.PORT, () => {
    console.log(`Serveur lancé sur le port ${process.env.PORT}`)
    }
);

app.use(session({
    secret: 'coucou',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// routes
const homeRoute = require("./Route/home")
const registerRoute = require("./Route/User/Authentification/register")
const loginRoute = require("./Route/User/Authentification/login")
const GoogleOAuthRoute = require("./Route/User/Authentification/OAuth2/Google.OAuth2")



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/auth/google", GoogleOAuthRoute);
