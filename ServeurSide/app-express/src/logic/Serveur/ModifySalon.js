const Salon = require("../../Model/Salon.model");

async function ModifySalon(req, res) {
  try {
    const idSalonn = req.body.idSalon;
      const salon = await Salon.findOne({
        where: { id: idSalonn },
      });

    if (!salon) {
        return res.status(404).json({ error: "Salon non trouvé." });
    }

   const modificationSalon =  await Salon.update({
        nom: req.body.nom,
        description: req.body.description,
    }, {
        where: { id: idSalonn },
    });
    return res.status(200).json({message: "Salon modifié."});

  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." });
  }
}

module.exports = {ModifySalon};