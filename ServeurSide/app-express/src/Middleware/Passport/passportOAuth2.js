const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const googleStrategy = require("passport-google-oauth2").Strategy;

const UserModel = require("../../Model/User.model");
const OAuth2Model = require("../../Model/OAuth/OAuth2.model");

passport.use(
  "googleOAuth",
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const userOAUTH = {
          id: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        };

        const existUser = await UserModel.findOne({
          where: { email: userOAUTH.email },
        });

        const isBanned = await BanModel.findOne({
          where: { idUser: existUser.id },
        });
        if (isBanned) {
          return done(null, false, { message: "Vous êtes banni" });
        }

        const existUserOAUTH = await OAuth2Model.findOne({
          where: { userOAuthId: userOAUTH.id },
        });

        if (existUser && existUserOAUTH) {
          return done(null, existUser, { message: "Connexion en cours" });
        }

        if (existUser && !existUserOAUTH) {
          await OAuth2Model.create({
            userId: existUser.id,
            userOAuthId: userOAUTH.id,
          });

          return done(null, existUser, { message: "Connexion en cours" });
        }

        const userCreated = await UserModel.create({
          username: userOAUTH.username,
          email: userOAUTH.email,
        });

        await OAuth2Model.create({
          userId: userCreated.id,
          userOAuthId: userOAUTH.id,
        });

        if (userCreated) {
          return done(null, userCreated, { message: "Inscription réussi" });
        }
      } catch (error) {
        return done(error, false, { message: "Erreur lors de l'inscription" });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user, { message: "serialize done" });
});

passport.deserializeUser((user, done) => {
  UserModel.findById(user.id, (err, user) => {
    done(err, user, { message: "deserialize done" });
  });
});

module.exports = passport;
