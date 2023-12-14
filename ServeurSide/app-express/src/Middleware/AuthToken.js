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

function verifyToken(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé aux non-connectés." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé : identification impossible." });
  }
}

function verifyAdminToken(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé aux non-connectés." });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    if (!req.user.admin) {
      return res.status(401).json({
        message:
          "Accès non autorisé. Vous ne possédez pas les droits pour accéder à ce service",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Accès non autorisé : identification impossible : " + err,
    });
  }
}

module.exports = { createToken, verifyToken, verifyAdminToken };
