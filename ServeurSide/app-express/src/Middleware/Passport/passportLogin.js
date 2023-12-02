const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Op } = require("sequelize");

const UserModel = require("../../Model/User.model");
const AdminModel = require("../../Model/SuperAdmin.model");

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
      const existsUser = await UserModel.findOne({
        where: { [Op.or]: [{ username: identidier }, { email: identidier }] },
      });

      if (!existsUser) {
        return passport(null, false, {
          message: "Cet utilisateur n'existe pas",
        });
      }

      const validate = await existsUser.validPassword(passport);

      if (!validate) {
        return passport(null, false, { message: "Mauvais mots de passe" });
      }

      const estAdmin = await AdminModel.findOne({
        where: { idUser: existsUser.id },
      });

      existsUser.estAdmin = estAdmin ? true : false;

      return passport(null, existsUser, { message: "Connexion réussi" });
    } catch (error) {
      return passport(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
