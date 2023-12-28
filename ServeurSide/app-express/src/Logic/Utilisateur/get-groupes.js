const UserModel = require('../../Model/User.model');
const GroupeModel = require('../../Model/Groupe.model');
const MembreGroupeModel = require('../../Model/Lien/MembreGroupe.model');  

const { infoToken } = require("../../Middleware/AuthToken");

const getGroupes = async (req, res) => {

    const id = infoToken(req).id;
    console.log("id user : " + id);

    try {
        const User = await UserModel.findOne( {where :{ id: id }});
        const MembreGroupe = await MembreGroupeModel.findOne( {where :{ userId: User.id }});
        if (!MembreGroupe) return res.status(200).json({ error: "Vous n'êtes pas membre d'un groupe" });
        let Groupes = [];
        for (let i = 0; i < MembreGroupe.length; i++) {
            const Groupe = await GroupeModel.findOne( {where :{ id: MembreGroupe[i].userId }});
            const NombreMembre = await MembreGroupeModel.count({ where: { groupeId: Groupe.id } });
            Groupes.push({
                id: Groupe.id,
                nomGroupe: Groupe.nom,
                nombreMembre: NombreMembre,
                imgLink: Groupe.lienImage,
            });
        }
        return res.status(200).json({ Groupes: Groupes });
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({ error: err });
    }
};

module.exports = getGroupes;