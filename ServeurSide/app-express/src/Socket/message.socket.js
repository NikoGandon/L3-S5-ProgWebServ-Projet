const MessageModele = require("../Model/Message/Message.model");
const MessageGroupeModele = require("../Model/Message/MessageGroupe.model");
const MembreGroupeModele = require("../Model/Lien/MembreGroupe.model");
const GroupeModele = require("../Model/Groupe.model");
const UserModele = require("../Model/User.model");

const { format } = require("date-fns");

async function handleSocketConnection(socket, io) {
  let newMessage = null;

  socket.on(
    "sendMessage",
    async ({ roomType, roomId, contenu, serveurId = null }) => {
      if (!contenu.trim()) {
        console.log("error");
        io.emit("Error sending", {
          message: "Le contenu du message est vide.",
        });
      }

      if (roomType == null || roomId == null) {
        console.log("error");
        io.emit("Error sending", {
          message: "Le type ou l'id de la room est invalide.",
        });
      }

      newMessage = await MessageModele.create({
        userId: socket.data.userId,
        contenu: contenu,
      });

      console.log("donnée recu", roomType, roomId, contenu, serveurId);

      if (roomType === "groupe") {
        handleGroupeMessage(socket, io, roomId, newMessage);
      } else if (roomType === "serveur") {
        handleSalonMessage(socket, io, roomId, serveurId, newMessage);
      }

      //socket?.serveurId?.io?.emit("incomingMessage", newMessage);

      const user = await UserModele.findOne({
        where: { id: socket.data.userId },
      });

      console.log("Message envoyé from API:", {
        message: newMessage,
        username: user.username,
      });

      const date = format(newMessage.createdAt, "dd/MM/yyyy HH:mm");

      io.in(room).emit("incomingMessage", {
        newMessage: {
          id: newMessage.id,
          contenu: newMessage.contenu,
          date: date,
          username: user.username,
        },
      });
    }
  );

  let room = "";

  socket.on("joinRoom", (contextUser, contextSalon) => {
    room = `${contextUser}-${contextSalon}`;
    console.log("//////////////////////////////////////user joined ", room);
    socket.join(room);
  });
}

async function handleGroupeMessage(socket, io, idContext, newMessage) {
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

async function handleSalonMessage(
  socket,
  io,
  idContext,
  serveurId,
  newMessage
) {
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
