const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Op } = require("sequelize");

const User = require("../../Models/User");

/**
 * @desc    Passport Login
 * @param   {String} identifier identifiant de l'utilisateur (email ou username)
 * @param   {String} password mot de passe de l'utilisateur
 *
 * @return  {Object} passport
 *
 */

passport.use(
  "passportLogin",
  new LocalStrategy(async (identidier, passport) => {
    try {
      const existsUser = await User.findOne({
        where: { [Op.or]: [{ username: identidier }, { email: identidier }] },
      });

      if (!existsUser) {
        return passport(null, false, {
          message: "Cet utilisateur n'existe pas",
        });
      }

      const validate = await existsUser.isValidPassword(passport);
      
      if (!validate) {
        return passport(null, false, { message: "Mauvais mots de passe" });
      }

      return passport(null, existsUser, { message: "Connexion réussi" });
    } catch (error) {
      return passport(error);
    }
  })
);

module.exports = passport;
