const JWT = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const AdminModel = require("../Model/SuperAdmin.model");

function createToken(user) {
  return JWT.sign(
    {
      id: user.id,
      admin: user.estAdmin,
      username: user.username,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    secretKey,
    {}
  );
}

/**
 * @desc Vérifie si l'utilisateur est connecté, si son token est valide
 * @param {*} req
 * @returns 0 s'il n'est pas connecté, -1 si le token est invalide, 1 s'il est valide
 */
function checkToken(req, tokenGet = null) {
  if (req == null && tokenGet != null) {
    try {
      JWT.verify(tokenGet, secretKey);
      return 1;
    } catch (err) {
      console.log(err);
      return -1;
    }
  }

  const token = req.cookies.authToken;
  if (!token) {
    return 0;
  }
  try {
    JWT.verify(token, secretKey);
    return 1;
  } catch (err) {
    return -1;
  }
}

function infoToken(req, tokenGet = null) {
  const tokenExists = checkToken(req, tokenGet);

  if (tokenExists == 0) {
    return { message: "Accès non autorisé aux non-connectés." };
  }
  if (tokenExists == -1) {
    return { message: "Token invalide." };
  }
  try {
    const token = tokenGet == null ? req.cookies.authToken : tokenGet;
    const decoded = JWT.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return { message: "Token invalide : " + err };
  }
}

function verifyToken(req, res, next) {
  const token = checkToken(req);
  if (token === -1 || token === 0) {
    return res
      .status(200)
      .json({ message: "Accès non autorisé aux non-connectés." });
  }
  next();
}

async function verifyAdminToken(req, res, next) {
  const token = checkToken(req);
  if (token === -1 || token === 0) {
    return res
      .status(200)
      .json({ message: "Accès non autorisé aux non-connectés." });
  }
  const estAdmin = await AdminModel.findByPk(infoToken(req).id);

  if (!estAdmin) {
    console.log("-------- pas admin 2");
    return res
      .status(200)
      .json({ message: "Accès non autorisé aux non-administrateurs." });
  }

  next();
}

module.exports = {
  createToken,
  checkToken,
  infoToken,
  verifyToken,
  verifyAdminToken,
};
