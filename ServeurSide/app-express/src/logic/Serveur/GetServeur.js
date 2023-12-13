const Serveur = require("../../Model/Serveur.model");

async function GetServeur(req, res) {
    try {
      const idServeur = req.body.idServeur;
      const serveur = await Serveur.findOne({
        where: { id: idServeur },
      });
  
      if (!serveur) {
        return res.status(404).json({ error: "Serveur non trouvé." });
      }
  
      return res.status(200).json({
        id: serveur.id,
        nom: serveur.nom,
        description: serveur.description,
        lienParametre: serveur.lienParametre,
        lienLog: serveur.lienLog,
      });
  
    } catch (error) {
      return res.status(500).json({ error: "Erreur lors de la récupération du serveur."  + error });
    }
  }

module.exports = {GetServeur};