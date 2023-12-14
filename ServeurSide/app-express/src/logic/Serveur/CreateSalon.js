const SalonModel = require("../../Model/Salon.model");

async function CreateSalon(req, res) {
  try {
    const id = req.body.id;
    const nom = req.body.nom;
    const description = req.body.description;
    const idServeur = req.body.idServeur;

    const NewSalon = await SalonModel.create({
      id: id,
      nom: nom,
      description: description,
      idServeur: idServeur,
    });

    return res.status(201).json(NewSalon);

  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." + error});
  }
    
}

module.exports = {CreateSalon};