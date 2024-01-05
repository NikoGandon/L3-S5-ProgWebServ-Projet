const express = require("express");
const logoutRouteur = express.Router();

/**
 * @swagger
 * /User/logout:
 * post:
 * description: Déconnecte l'utilisateur
 * responses:
 * 
 */

logoutRouteur.get("/", (req, res, next) => {
    try {
        res.clearCookie('authToken', {
          domain: 'localhost',
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'None',
        });
      
        // Répondez avec un statut 200 pour indiquer que la déconnexion s'est bien passée
        res.status(200).send('Déconnexion réussie');
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        res.status(500).send('Erreur lors de la déconnexion');
      }
});

module.exports = logoutRouteur;