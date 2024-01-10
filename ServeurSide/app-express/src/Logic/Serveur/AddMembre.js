const MembreServeur = require("../../Model/MembreServeur.model");
const { infoToken } = require("../../Middleware/AuthToken");
const UserModel = require("../../Model/User.model");

/**
 * @description Invite un membre dans un serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function InviteMembre(req, res) {
  try {
    const idServer = req.body.idServer;
    const nameUser = req.body.nom;
    const Ami = await UserModel.findOne({
      where: { username: nameUser }
    })
    if (!Ami) {
      return res.status(404).json({ error: "Aucun utilisateur trouvé avec le nom spécifié." });
    }

    const invMembre = await MembreServeur.create({
      idUser: Ami.id,
      idServeur: idServer,
    });

    return res.status(201).json(invMembre);
  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." + error });
  }
}

module.exports = { InviteMembre };
