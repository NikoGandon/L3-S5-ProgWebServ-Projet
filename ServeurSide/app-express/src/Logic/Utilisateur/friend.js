const FriendModels = require("../../Model/Lien/FriendUser.model");
const UserModel = require("../../Model/User.model");
const {Op} = require("sequelize");

const { infoToken } = require("../../Middleware/AuthToken");

/**
 * @description Récupère les amis de l'utilisateur
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getFriend = async (req, res) => {
  try {
    const user = infoToken(req).id;
    if (!user) {
      return res.status(402).json({ error: "Vous n'êtes pas connecté" });
    }

    // Utilisez Op.or correctement
    const friends = await FriendModels.findAll({
      where: {
        [Op.or]: [{ userId: user }, { friendId: user }],
      },
    });

    let amis = [];

    for (const friend of friends) {
      const myFriend = await UserModel.findByPk(friend.friendId);
      amis.push({
        username: myFriend.username,
        lienPP: myFriend.lienPP,
      });
    }
    return res.status(200).json({ amis: amis });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};


/**
 * @description Ajoute un ami à l'utilisateur
 * @param {*} req
 * @param {*} res
 * @returns
 */

const addFriend = async (req, res) => {
  try {
    const idUser = infoToken(req).id;
    const nomAmi = req.body.nom;
    const Ami = await UserModel.findOne({
      where: { username: nomAmi }
    })
    if (!Ami) {
      return res.status(404).json({ error: "Aucun utilisateur trouvé avec le nom spécifié." });
    }
    console.log("-----------");
    console.log(Ami.id);
    await FriendModels.create({
      userId: idUser,
      friendId: Ami.id,
    });

    return res.status(200).json({ message: "Ami ajouté avec succès." });
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * @description Supprime un ami de l'utilisateur
 * @param {*} req
 * @param {*} res
 * @returns
 */

const removeFriend = async (req, res) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return false;
    }
    if (!user.friend.includes(friend)) {
      return false;
    }
    user.friend.pull(friend);
    await user.save();
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getFriend,
  addFriend,
  removeFriend,
};
