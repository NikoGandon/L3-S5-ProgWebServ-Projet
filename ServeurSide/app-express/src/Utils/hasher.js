const bcrypt = require("bcrypt");

function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => resolve(hashedPassword))
      .catch((error) => reject(error));
  });
}

function compare(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { hash, compare };
