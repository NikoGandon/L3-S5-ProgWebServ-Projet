const InviteMembreModel = require("../../Model/InviteMembreModel.model");

async function InviteMembre(req, res) {
  try {
    const id = req.body.id;
    const nom = req.body.nom;
    const description = req.body.description;
    const idServeur = req.body.idServeur;

    const invMembre = await InviteMembreModel.create({
      id: id,
      nom: nom,
      description: description,
      idServeur: idServeur,
    });

    return res.status(201).json(invMembre);

  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." + error});
  }
    
}

module.exports = {InviteMembre};