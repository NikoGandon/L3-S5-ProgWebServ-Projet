const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Op } = require("sequelize");

const User = require("../../Model/User.model");
const { hash } = require("../../Utils/hasher");

/**
 * @desc    Passport Register
 * @param   {String} username nom d'utilisateur
 * @param   {String} email email de l'utilisateur
 * @param   {String} password mot de passe de l'utilisateur
 *
 * @return  {Object} passport
 *
 */

passport.use(
  "passportRegister",
  new LocalStrategy({
    passReqToCallback: true
  }, async (req, username, password, done) => {
    try {
      const email = req.body.email;
      const existUser = await User.findOne({
        where: { [Op.or]: [{ username: username }, { email: email }] },
      });

      if (existUser) {
        return done(null, false, { message: "Cet utilisateur existe déjà" });
      }

      const hashedPassword = await hash(password);

      const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });

      return done(null, newUser, { message: "Inscription réussi" });
    } catch (error) {
      return done(error, false, { message: "Erreur lors de l'inscription" });
    }
  })
);

module.exports = passport;
