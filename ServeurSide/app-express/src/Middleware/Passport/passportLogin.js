const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Op } = require("sequelize");

const UserModel = require("../../Model/User.model");
const AdminModel = require("../../Model/SuperAdmin.model");
const BanModel = require("../../Model/Administration/BanSite.model");

const { compare } = require("../../Utils/hasher");

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
  new LocalStrategy(async (username, password, done) => {
    try {
      const existsUser = await UserModel.findOne({
        where: { [Op.or]: [{ username: username }, { email: username }] },
      });

      if (!existsUser) {
        return done(null, false, {
          message: "Cet utilisateur n'existe pas",
        });
      }

      const isBanned = await BanModel.findOne({
        where: { idUser: existsUser.id },
      });
      
      if (isBanned) {
        return done(null, false, { message: "Vous êtes banni" });
      }

      const validate = compare(password, existsUser.password);

      if (!validate) {
        return done(null, false, { message: "Mauvais mots de passe" });
      }

      const estAdmin = await AdminModel.findOne({
        where: { userId: existsUser.id },
      });

      existsUser.admin = false;
      if (estAdmin) {
        existsUser.admin = true;
      }

      return done(null, existsUser, { message: "Connexion réussi" });
    } catch (error) {
      return done(null, null, {
        message: "Erreur lors de la connexion : " + error,
      });
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
