const MessageModele = require("../Model/Message/Message.model");
const MessageGroupeModele = require("../Model/Message/MessageGroupe.model");
const MembreGroupeModele = require("../Model/Lien/MembreGroupe.model");
const GroupeModele = require("../Model/Groupe.model");
const { format } = require("date-fns");

async function handleSocketConnection(socket, io) {
  socket.on(
    "sendMessage",
    async ({ roomType, roomId, contenu, serveurId = null }) => {
      if (!contenu.trim()) {
        throw new Error("Le contenu du message est vide.");
      }

      if (roomType == null || roomId == null) {
        throw new Error("Le type ou l'id de la room est invalide.");
      }

      const newMessage = await MessageModele.create({
        userId: socket.data.userId,
        contenu: contenu,
      });

      if (roomType === "groupe") {
        handleGroupeMessage(socket, roomId, newMessage);
      } else if (roomType === "serveur") {
        handleSalonMessage(socket, roomId, serveurId, newMessage);
      }

      const date = format(newMessage.createdAt, "dd/MM/yyyy HH:mm");

    }
  );
}

async function handleGroupeMessage(socket, idContext, newMessage) {
  const groupe = await GroupeModele.findOne({ where: { id: idContext } });

  const userestGroup = await MembreGroupeModele.findOne({
    where: {
      userId: socket.data.userId,
      groupeId: idContext,
    },
  });

  if (!groupe || !userestGroup) {
    newMessage.destroy();
    throw new Error(
      "Le groupe n'existe pas ou l'utilisateur n'est pas membre."
    );
  }

  await MessageGroupeModele.create({
    messageId: newMessage.id,
    groupeId: idContext,
  }).catch((error) => {
    newMessage.destroy();
    throw new Error("Erreur lors de la création du message dans le groupe.");
  });
}

const MembreServeurModele = require("../Model/MembreServeur.model");
const MessageSalonModele = require("../Model/Message/MessageSalon.model");
const SalonModele = require("../Model/Salon.model");

async function handleSalonMessage(socket, idContext, serveurId, newMessage) {
  const salon = await SalonModele.findOne({
    attributes: ["id", "nom", "description", "idServeur"],
    where: {
      id: idContext,
      idServeur: serveurId,
    },
  });

  const userestSrv = await MembreServeurModele.findOne({
    where: {
      idUser: socket.data.userId,
      idServeur: serveurId,
    },
  });

  if (!salon || !userestSrv) {
    newMessage.destroy();
    throw new Error(
      "Le salon ou serveur n'existe pas ou l'utilisateur n'est pas membre du serveur."
    );
  }

  await MessageSalonModele.create({
    idMessage: newMessage.id,
    idSalon: idContext,
  }).catch((error) => {
    newMessage.destroy();
    throw new Error("Erreur lors de la création du message dans le serveur.");
  });
}

module.exports = { handleSocketConnection };
