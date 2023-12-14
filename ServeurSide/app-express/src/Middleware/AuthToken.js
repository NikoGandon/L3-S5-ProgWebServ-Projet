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
    {
      expiresIn: "24h",
    }
  );
}

function checkToken(req, res) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (!token) {
    return -1;
  }
  try {
    const decoded = JWT.verify(token, secretKey);
    if (decoded.admin) {
      return 1;
    }
    return 0;
  } catch (err) {
    return -1;
  }
}

function infoToken(req, res) {
  const token = checkToken(req, res);
  if (token == -1) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé aux non-connectés." });
  }
  try {
    const decoded = JWT.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return -1;
  }
}

function verifyToken(req, res, next) {
  const token = checkToken(req, res);
  if (token === -1) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé aux non-connectés." });
  }
  next();
}

function verifyAdminToken(req, res, next) {
  const token = checkToken(req, res);
  if (token === -1) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé aux non-connectés." });
  }
  if (token === 0) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé aux non-administrateurs." });
  }
  next();
}

module.exports = { createToken, checkToken, verifyToken, verifyAdminToken };
