const UserModel = require("../../Model/User.model");

const { infoToken } = require("../../Middleware/AuthToken");

async function getInformation(req, res) {
  const token = infoToken(req);
  const id = token.id;
  const info = await UserModel.findOne({ id: id }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Erreur interne." });
    }
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }
  });
  return res
    .status(200)
    .json({
      infoUser: {
        email: info.email,
        bio: info.bio,
        lienPP: info.lienPP,
        lienParam: info.lienParametre,
      },
    });
}

async function updateInformation(req, res) {
  const { username, email, password, bio } = req.body;
  const token = infoToken(req);
  const id = token.id;
  const user = await UserModel.findOne({ id: id });
  if (!user) {
    return res.status(401).json({ message: "Utilisateur non trouvé." });
  }
  try {
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (bio){
        user.bio = bio;
    }
    await user.save();
    return res.status(200).json({ message: "Utilisateur modifié." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur interne." });
  }
}

async function deleteUser(req, res) {
  const token = infoToken(req);
  const id = token.id;
  const user = await UserModel.findOne({ id: id });
  if (!user) {
    return res.status(401).json({ message: "Utilisateur non trouvé." });
  }
  try {
    await user.delete();
  } catch (error) {
    return res.status(500).json({ message: "Erreur interne." });
  }
  return res.status(200).json({ message: "Utilisateur supprimé." });
}

module.exports = {
  getInformation,
  updateInformation,
  deleteUser,
};
