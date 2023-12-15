const JWT = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

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

function checkToken(req) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (!token) {
    return 0;
  }
  try {
    const decoded = JWT.verify(token, secretKey);
    if (decoded.admin) {
      return 2;
    }
    return 1;
  } catch (err) {
    return -1;
  }
}

function infoToken(req) {
  const token = checkToken(req);
  if (token == 0) {
    return { message: "Accès non autorisé aux non-connectés." };
  }
  if (token == -1) {
    return { message: "Token invalide." };
  }
  try {
    const decoded = JWT.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return { message: "Token invalide : " + err };
  }
}

function verifyToken(req, res, next) {
  const token = checkToken(req);
  if (token === -1 || token === 0) {
    return res.status(401).json({ message: "Accès non autorisé aux non-connectés." });
  }
  next();
}

function verifyAdminToken(req, res, next) {
  const token = checkToken(req, res);
  if (token === -1 || token === 0) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé aux non-connectés." });
  }
  if (token === 1) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé aux non-administrateurs." });
  }
  next();
}

module.exports = { createToken, checkToken, infoToken, verifyToken, verifyAdminToken };
