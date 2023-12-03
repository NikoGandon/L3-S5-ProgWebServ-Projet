const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const googleStrategy = require("passport-google-oauth2").Strategy;

const UserModel = require("../../Model/User.model");

passport.use(
  "googleOAuth",
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user);
    }
);

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;