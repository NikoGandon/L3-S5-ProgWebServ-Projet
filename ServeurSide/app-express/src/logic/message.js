

async function getConversationMessages(idCouple) {
    try {
        const messages = await Message.findAll({
            where: {
              idCouple: idCouple 
            },
            order: [['envoyé', 'ASC']] // Trie par date si nécessaire
        });
  
        return messages;
    } catch (error) {
        console.error('Erreur lors de la récupération des messages de la conversation :', error);
        throw error;
    }
  }

  module.exports={getConversationMessages};
io.on('connexion', (socket) => {
    socket.on('privateMessage', async (data) => {
        const { idCouple, idMessage,contenu } = data;
              try {
                  // Validation du message pour voir si message vide
                  if (!contenu.trim()) {
                      throw new Error('Le contenu du message est vide.');
                  }
      
                  
                  const newMessage = await Messagemodel.create({
                      idUserRe: socket.user.id,  // user qui reçoit le message
                      idCouple: idCouple,
                      idMessage: idMessage,
                      contenu: contenu
                  });
      
                  // Envoie du message au destinataire
                  io.to(idCouple).emit('privateMessage', {
                      idUserRe: socket.user.id, // envoie le message à tout les socket ayant l'id du receveur
                      idMessage: idMessage,
                  });
              } catch (error) {
                  // Gestion des erreurs
                  socket.emit('errorMessage', { message: error.message });
                  console.error('Erreur lors de l\'envoi du message :', error);
              }
          });
          io.on('connexion', (socket) => {
            socket.on('conversation entre le couple', (idCouple) => {
                socket.join(idCouple);
            });
          });
          });
 socket.on('suppMessage', async (idMessage) => {
            try {
              const message = await Message.findByPk(idMessage);
          
              if (!message) {
                  throw new Error('Le message n\'existe pas.');
              }
          
              // Vérifie si l'utilisateur actuel est autorisé à supprimer ce message
              if (message.idCouple !== socket.user.id) {
                  throw new Error('L\'utilisateur n\'est pas autorisé à supprimer ce message.');
              }
          
                // Supprime le message dans la base de données
                await Message.destroy({
                    where: { id: idMessage }
                });
          
                
                io.emit('Message supprimé', idMessage);
            } catch (error) {
                // Gestion des erreurs
                console.error('Erreur lors de la suppression du message :', error);
            }
          });
io.on('connexion', (socket) => {
            socket.on('Recevoir message', (data) => {
                const { idCouple, idMessage } = data;
                // Sauvegarde du message dans la base de données avec Sequelize
                // Envoie du message à l'utilisateur destinataire
                io.to(idCouple).emit('Recevoir message', { idCouple : socket.user.id, idMessage });
            });
        });
// partie groupe
        async function getGroupMessages(idGroup) {
            try {
                const messages = await Message.findAll({
                    where: {
                        idGroup: idGroup // Récupère tous les messages liés à ce groupe
                    },
                    order: [['envoyé', 'ASC']]
                });
                return messages;
            } catch (error) {
                console.error('Erreur lors de la récupération des messages du groupe :', error);
                throw error;
            }
          }
          module.exports={getGroupMessages};

          socket.on('envoiemessagegr', async ({ idGroup, contenu }) => {
            try {
                // Vérification si l'utilisateur appartient au groupe
                const userestGroup = await UserGroup.findOne({
                    where: {
                        userId: socket.user.id,
                        idGroup: idGroup
                    }
                });
          
                if (!userestGroup) {
                    throw new Error('L\'utilisateur ne fait pas partie de ce groupe.');
                }
                const newMessage = await Message.create({
                    idGroup: idGroup,
                    idUser: socket.user.id,
                    contenu: contenu
                
                });
          
                // Émission d'un événement pour informer les membres du groupe du nouveau message dans le groupe
                io.to(idGroup).emit('groupMessage', newMessage);
            } catch (error) {
                console.error('Erreur lors de l\'envoi du message dans le groupe :', error);
                socket.emit('envoiemessagegr', { message: error.message });
            }
          }); 
          socket.on('deleteGroupMessage', async ({ idMessage, idGroup }) => {
            try {
                // Vérification si l'utilisateur a le droit de supprimer le message (par exemple : est-il l'auteur du message ?)
                const isMessageAuteur = await Message.findOne({
                    where: {
                        idMessage: idMessage,
                        idUser: socket.user.id
                    }
                });
          
                if (!isMessageAuteur || idUser!==idCreateur) {
                    throw new Error('L\'utilisateur n\'est pas autorisé à supprimer ce message.');
                }
          
                // Suppression du message dans la base de données
                await Message.destroy({
                    where: {
                        idMessage: idMessage,
                        idGroup: idGroup
                    }
                });
          
                // Émission d'un événement pour informer les clients du groupe de la suppression du message
                io.to(idGroup).emit('groupMessageDeleted', idMessage);
            } catch (error) {
                console.error('Erreur lors de la suppression du message dans le groupe :', error);
                socket.emit('deleteGroupMessageError', { message: error.message });
            }
          });           
// partie serveur
          io.on('connection', (socket) => {
            console.log('Nouvelle connexion:', socket.id);
        
            // Événement lorsque l'utilisateur se connecte à un serveur spécifique
            socket.on('user_connected', ({ idUser, idServeur }) => {
                if (!servers[idServeur]) {
                    servers[idServeur] = {};
                }
        
                servers[idServeur][socket.id] = idUser;
        
                io.to(idServeur).emit('user_list', Object.values(servers[idServeur]));
                socket.join(idServeur);
            });
        
            // Événement pour envoyer un message dans un serveur spécifique
            socket.on('chat_message', ({ idMessage, idServeur }) => {
                io.to(idServeur).emit('chat_message', { idUser: servers[idServeur][socket.id], idMessage });
            });

        })
        socket.on('suppmessage', ({ idMessage, idServeur }) => {
          
            io.to(idServeur).emit('suppmessage', { idMessage });
        })

        socket.on('voirmessage', ({ idMessage, idServeur }) => {
            io.to(idServeur).emit('voirmessage', { idUser: idUser[socket.id], idMessage });
        });