const express = require('express');
const router = express.Router();
const Groupe = require('../Model/Groupe.model');
const Membre = require('../Model/Lien/MembreGroupe.model');
const Message = require('../Model/Lien/Message.model');


// GROUPE PAGE
router.get('/', async (req, res) => {
    try {
        const idGroupe = req.body.idGroupe;
        const LeGroupe = await Groupe.findByPk(idGroupe);

        if (LeGroupe) {
            res.status(200).json(LeGroupe);
        } else {
            res.status(404).json({ error: 'Groupe non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de groupe'});
    }
});

 // CREATE GROUPE
router.post('/', async (req, res) => {
    try {
        const newGroup = await Groupe.create({
            nom: req.body.nom,
        });

        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du groupe' });
    }
});


// MODIF GROUPE

router.put('/', async (req, res) => {
    try {
        const idGroupe = req.body.idGroupe;
        const nom = req.body.nom;
        const photo = req.body.photoGroupe;

        if (idGroupe) {
            Groupe.update({
                nom: nom,
                
            }, {
                where: {
                    id: idGroupe,
                }
            });
            res.status(200).json({ message: 'Groupe modifié'});
        } else {
            res.status(404).json({ error: 'Erreur de modification de groupe' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la modification de groupe'});
    }
});

// DELETE GROUPE

router.delete('/', async (req, res) => {
    try {
        const idGroupe = req.body.idGroupe;

        if (idGroupe) {
            // Supprimer le groupe
            Groupe.destroy({
                where: {
                    id: idGroupe,
                }
            });
            res.status(200).json({ message: 'Groupe supprimé'});
        } else {
            res.status(404).json({ error: 'Erreur de suppression de groupe' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de groupe'});
    }
});


// ADD MEMBRE
router.post('/AddMembre', async (req, res) => {
    try {
        const newMembre = await Membre.create({
            Userid : req.body.Userid,
            Groupeid : req.body.Groupeid,
        });

        res.status(201).json(newMembre);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout du membre'});
    }
});

// DELETE MEMBRE

router.delete('/Membre', async (req, res) => {
    try {
        const idGroupe = req.body.idGroupe;
        const idMembre = req.body.idUser;


        if (idMembre) {
            Membre.destroy({
                where: {
                    Userid: idMembre,
                    Groupeid: idGroupe,
                }
            });
            res.status(200).json(idMembre);
        } else {
            res.status(404).json({ error: 'Erreur de suppression de membre' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de suppression de membre'});
    }
});

// ENVOI MESSAGE
router.post('/Message', async (req, res) => {
    try {
        const newMessage = await Message.create({
            idMessage : req.body.idMessage,
            contenu : req.body.contenu,
            date : req.body.date,
            updateAt : req.body.updateAt,
            userId : req.body.userId,
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'envoi de message'});
    }
});

// DELETE MESSAGE
router.delete('/Message', async (req, res) => {
    try {
        const idMessage = req.body.idMessage;

        if (idMessage) {
            Message.destroy({
                where: {
                    id: idMessage,
                }
            });
            res.status(200).json({ message: 'Message supprimé'});
        } else {
            res.status(404).json({ error: 'Erreur de suppression de message' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de suppression de message'});
    }
});

// RECEVOIR MESSAGE
router.get('/Message', async (req, res) => {
    try {
        const idGroupe = req.body.idGroupe;
        const LeMessage = await Message.findAll({
            where: {
                Groupeid: idGroupe,
            }
        });

        if (LeMessage) {
            res.status(200).json(LeMessage);
        } else {
            res.status(404).json({ error: 'Message non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de message'});
    }
});