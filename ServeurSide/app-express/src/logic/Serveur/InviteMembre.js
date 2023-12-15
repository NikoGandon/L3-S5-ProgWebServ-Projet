const MembreServeur = require("../../Model/MembreServeur.model");

/**
 * @description Invite un membre dans un serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function InviteMembre(req, res) {
  try {
    const idUser = req.body.idUser;
    const idServeur = req.body.idServeur;

    const invMembre = await MembreServeur.create({
      idUser: idUser,
      idServeur: idServeur,
    });

    return res.status(201).json(invMembre);
  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." + error });
  }
}

module.exports = { InviteMembre };
