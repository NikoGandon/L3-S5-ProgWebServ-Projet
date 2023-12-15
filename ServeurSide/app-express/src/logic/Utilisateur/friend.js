const FriendModels = require("../../Model/Lien/FriendUser.model");

/**
 * @description Récupère les amis de l'utilisateur
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getFriend = async (req, res) => {
  try {
    const user = await UserModels.findById(req.body.id);
    if (!user) {
      return null;
    }
    const friends = await FriendModels.findAll({ where: { userId: idUser } });
    return friends;
  } catch (error) {
    return null;
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
    const user = await UserModels.findById(id);

    return !!user;
  } catch (error) {
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
    const user = await UserModels.findById(id);
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
