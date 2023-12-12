const UserModels = require('../../models/UserModels');

/**
 * Récupère la blocklist de l'utilisateur
 * @param {*} req 
 * @param {*} res 
 * @returns Un message d'information
 */
const getBlocklist = async (req, res) => {
    try {
        const user = await UserModels.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        return res.status(200).json(user.blocklist);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Ajoute un utilisateur dans la blocklist
 * @param {*} req 
 * @param {*} res 
 * @returns Un message d'information
 */

const addBlocklist = async (req, res) => {
    try {
        const user = await UserModels.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        if (user.blocklist.includes(req.body.id)) {
            return res.status(400).json({ message: "Utilisateur déjà bloqué" });
        }
        user.blocklist.push(req.body.id);
        await user.save();
        return res.status(200).json({ message: "Utilisateur bloqué" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Débloque un utilisateur de la blocklist
 * @param {*} req 
 * @param {*} res 
 * @returns Un message d'information
 */

const removeBlocklist = async (req, res) => {
    try {
        const user = await UserModels.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        if (!user.blocklist.includes(req.body.id)) {
            return res.status(400).json({ message: "Utilisateur déjà débloqué" });
        }
        user.blocklist.pull(req.body.id);
        await user.save();
        return res.status(200).json({ message: "Utilisateur débloqué" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getBlocklist,
    addBlocklist,
    removeBlocklist
}