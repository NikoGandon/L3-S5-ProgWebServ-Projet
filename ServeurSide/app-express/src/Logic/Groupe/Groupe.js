const express = require('express');
const router = express.Router();
const Groupe = require('../../Model/Groupe.model');
const Membre = require('../../Model/Lien/MembreGroupe.model');
const Message = require('../../Model/Message/Message.model');

// GROUPE PAGE

function pagegroupe(req, res){
    try {
        const idGroupe = req.body.idGroupe;
        const LeGroupe = Groupe.findByPk(idGroupe);

        if (LeGroupe) {
            return res.status(200).json(LeGroupe);
        } else {
            return res.status(404).json({ error: 'Groupe non trouvé' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la récupération de groupe'});
    }
}

 // CREATE GROUPE

function creergroupe(req, res){
    try {
        const newGroup = Groupe.create({
            nom: req.body.nom,
        });
        return res.status(201).json(newGroup);
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la création du groupe' });
    }
}

// MODIF GROUPE

function modifgroupe(req, res){
    try {
        const idGroupe = req.body.idGroupe;
        const nom = req.body.nom;
        const photo = req.body.photoGroupe;

        if (idGroupe) {
            Groupe.update({
                nom: nom,
                lienImage: photo
                
            }, {
                where: {
                    id: idGroupe,
                }
            });
            return res.status(200).json({ message: 'Groupe modifié'});
        } else {
            return res.status(404).json({ error: 'Erreur de modification de groupe' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la modification de groupe'});
    }
}

// DELETE GROUPE

function suprimegroupe(req, res){
    try {
        const idGroupe = req.body.idGroupe;

        if (idGroupe) {
            Groupe.destroy({
                where: {
                    id: idGroupe,
                }
            });
            return res.status(200).json({ message: 'Groupe supprimé'});
        } else {
            return res.status(404).json({ error: 'Erreur de suppression de groupe' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la suppression de groupe'});
    }
}


// ADD MEMBRE

function addmembre(req, res){
    try {
        const newMembre = Membre.create({
            Userid : req.body.Userid,
            Groupeid : req.body.Groupeid,
        });

        return res.status(201).json(newMembre);
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de l\'ajout du membre'});
    }
}

// DELETE MEMBRE

function deletemembre(req, res){
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
            return res.status(200).json(idMembre);
        } else {
            return res.status(404).json({ error: 'Erreur de suppression de membre' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de suppression de membre'});
    }
}


// ENVOI MESSAGE

function envoimessage(req, res){
    try {
        const newMessage = Message.create({
            idMessage : req.body.idMessage,
            contenu : req.body.contenu,
            date : req.body.date,
            updateAt : req.body.updateAt,
            userId : req.body.userId,
        });

        return res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de l\'envoi de message'});
    }
}

// DELETE MESSAGE

function deletemessage(req, res){
    try {
        const idMessage = req.body.idMessage;

        if (idMessage) {
            Message.destroy({
                where: {
                    id: idMessage,
                }
            });
            return res.status(200).json({ message: 'Message supprimé'});
        } else {
            return res.status(404).json({ error: 'Erreur de suppression de message' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de suppression de message'});
    }
}

// RECEVOIR MESSAGE

function recevoirmessage(req, res){
    try {
        const idGroupe = req.body.idGroupe;
        const LeMessage = Message.findAll({
            where: {
                Groupeid: idGroupe,
            }
        });

        if (LeMessage) {
            return res.status(200).json(LeMessage);
        } else {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la récupération de message'});
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
    recevoirmessage
}