const UserModel = require('../../Model/User.model');

const { infoToken } = require("../../Middleware/AuthToken");

async function getInformation(req, res) {
    const token = infoToken(req);
    const id = token.id;

    const infos = UserModel.findOne({ id: id }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Erreur interne." });
        }
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé." });
        }
        return res.status(200).json({ 
            id: user.id,
            username: user.username,
            email: user.email,
            lienImage: user.lienImage,
         });
    });

    return res.status(200).json({ infos });
}

async function updateInformation(req, res) {
    const { username, email, password } = req.body;
    const token = infoToken(req);
    const id = token.id;
    const user = await UserModel.findOne({ id: id });
    if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé." });
    }
    if (username) {
        user.username = username;
    }
    if (email) {
        user.email = email;
    }
    if (password) {
        user.password = password;
    }
    await user.save();
    return res.status(200).json({ message: "Utilisateur modifié." });
}

async function deleteUser(req, res) {
    const token = infoToken(req);
    const id = token.id;
    const user = await UserModel.findOne({ id: id });
    if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé." });
    }
    await user.delete();
    return res.status(200).json({ message: "Utilisateur supprimé." });
}

module.exports = {
    getInformation,
    updateInformation,
    deleteUser
}