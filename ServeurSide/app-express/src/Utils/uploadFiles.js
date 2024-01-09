const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Le dossier où les fichiers seront sauvegardés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Renommer le fichier
  },
});

const upload = multer({ storage: storage });

module.exports = upload;