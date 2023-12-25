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
    (request, accessToken, refreshToken, profile, done) => {
      const user = {
        username: profile.displayName,
        email: profile.emails[0].value,
      };

      OAuth2Model.findOne({ userOAuthID: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          UserModel.create(user, (err, user) => {
            if (err) {
              return done(err);
            }
            return done(null, user);
          }).then((user) => {
            OAuth2Model.create({
              userId: user.id,
              userOAuthId: profile.id,
            });
          }).catch((err) => {
            console.log(err);
          });
        }

        return done(null, user);
      });

      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  UserModel.findById(user.id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
