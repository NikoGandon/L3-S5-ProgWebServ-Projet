const Groupe = require("../../Model/Groupe.model");
const Membre = require("../../Model/Lien/MembreGroupe.model");
const Message = require("../../Model/Message/Message.model");
const MessageGroupe = require("../../Model/Message/MessageGroupe.model");

const {infoToken} = require("../../Middleware/AuthToken");


/**
 * @description Page du groupe
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function pagegroupe(req, res) {
  try {
    const idGroupe = req.body.idGroupe;
    const LeGroupe = await Groupe.findByPk(idGroupe);

    if (!LeGroupe) {
      return res.status(404).json({ error: "Groupe non trouvé" });
    }
    return res.status(201).json(LeGroupe);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération de groupe" });
  }
}

/**
 * @description Crée un groupe
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function creergroupe(req, res) {
  try {
    const idUser = infoToken(req).id;
    const newGroup = await Groupe.create({
      nom: req.body.nom,
      lienImage: req.body.lienImage,
      idCreateur: idUser,
    });
    return res.status(201).json(newGroup);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la création du groupe" });
  }
}

/**
 * @description Modifie un groupe
 * @param {*} req
 * @param {*} res
 * @returns
 */

function modifgroupe(req, res) {
  try {
    const idGroupe = req.body.idGroupe;
    const nom = req.body.nom;
    const photo = req.body.photoGroupe;

    if (idGroupe) {
      Groupe.update(
        {
          nom: nom,
          lienImage: photo,
        },
        {
          where: {
            id: idGroupe,
          },
        }
      );
      return res.status(200).json({ message: "Groupe modifié" });
    } else {
      return res
        .status(404)
        .json({ error: "Erreur de modification de groupe" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la modification de groupe" });
  }
}

/**
 * @description Supprime un groupe
 * @param {*} req
 * @param {*} res
 * @returns
 */

function suprimegroupe(req, res) {
  try {
    const idGroupe = req.body.idGroupe;

    if (idGroupe) {
      Groupe.destroy({
        where: {
          id: idGroupe,
        },
      });
      return res.status(200).json({ message: "Groupe supprimé" });
    } else {
      return res.status(404).json({ error: "Erreur de suppression de groupe" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la suppression de groupe" });
  }
}

/**
 * @description Ajoute un membre
 * @param {*} req
 * @param {*} res
 * @returns
 */

function addmembre(req, res) {
  try {
    const newMembre = Membre.create({
      userId: req.body.idUser,
      groupeId: req.body.idGroupe,
    });

    return res.status(201).json(newMembre);
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de l'ajout du membre" });
  }
}

/**
 * @description Supprime un membre
 * @param {*} req
 * @param {*} res
 * @returns
 */

function deletemembre(req, res) {
  try {
    const idGroupe = req.body.idGroupe;
    const idMembre = req.body.idUser;

    if (idMembre) {
      Membre.destroy({
        where: {
          Userid: idMembre,
          Groupeid: idGroupe,
        },
      });
      return res.status(200).json(idMembre);
    } else {
      return res.status(404).json({ error: "Erreur de suppression de membre" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de suppression de membre" });
  }
}

/**
 * @description Envoi un message
 * @param {*} req
 * @param {*} res
 * @returns
 */

function envoimessage(req, res) {
  try {
    const newMessage = Message.create({
      contenu: req.body.contenu,
      userId: req.body.userId,
    });

    MessageGroupe.create({
      messageId: newMessage.id,
      groupeId: req.body.Groupeid,
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de l'envoi de message" });
  }
}

/**
 * @description Supprime un message
 * @param {*} req
 * @param {*} res
 * @returns
 */

function deletemessage(req, res) {
  try {
    const idMessage = req.body.idMessage;

    if (idMessage) {
      Message.destroy({
        where: {
          id: idMessage,
        },
      });
      return res.status(200).json({ message: "Message supprimé" });
    } else {
      return res
        .status(404)
        .json({ error: "Erreur de suppression de message" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de suppression de message" });
  }
}

/**
 * @description Récupère les messages
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function recevoirmessage(req, res) {
  try {
    const idGroupe = req.body.idGroupe;
    const messageGroupe = await MessageGroupe.findAll({
      where: {
        groupeId: idGroupe,
      },
    });

    const messages = [];
    for (let message in messageGroupe) {
      const messageid = messageGroupe[message].messageId;
      const messageContenu = await Message.findByPk(messageid);
      messages.push(messageContenu);
    }

    if (messages.length != 0) {
      return res.status(200).json(messages);
    } else {
      return res.status(404).json({ error: "Message non trouvé" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération de message" + error });
  }
}

module.exports = {
  pagegroupe,
  creergroupe,
  modifgroupe,
  suprimegroupe,
  addmembre,
  deletemembre,
  envoimessage,
  deletemessage,
  recevoirmessage,
};
