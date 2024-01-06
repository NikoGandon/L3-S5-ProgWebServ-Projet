const UserModel = require('../../Model/User.model');
const ServeurModel = require('../../Model/Serveur.model');
const MembreServeurModel = require('../../Model/MembreServeur.model');  

const { infoToken } = require("../../Middleware/AuthToken");

const getServeurs = async (req, res) => {

    const id = infoToken(req).id;

    try {
        const User = await UserModel.findOne( {where :{ id: id }});
        const MembreServeur = await MembreServeurModel.findAll( {where :{ idUser: User.id }});
        if (MembreServeur.length == 0) return res.status(200).json({ error: "Vous n'êtes pas membre d'un Serveur", Serveurs: [] });
        let Serveurs = [];
        for (let i = 0; i < MembreServeur.length; i++) {
            const Serveur = await ServeurModel.findOne( {where :{ id: MembreServeur[i].idServeur }});
            const NombreMembre = await MembreServeurModel.count({ where: { idServeur: Serveur.id } });
            Serveurs.push({
                id: Serveur.id,
                nomServeur: Serveur.nom,
                nombreMembre: NombreMembre,
                imgLink: Serveur.lienImage,
            });
        }
        return res.status(200).json({ Serveurs: Serveurs });
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({ error: err });
    }
};

module.exports = getServeurs;