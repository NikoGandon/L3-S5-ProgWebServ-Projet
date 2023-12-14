const bcrypt = require("bcrypt");

async function hash(password) {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      resolve(hashedPassword);
    } catch (error) {
      reject(error);
    }
  });
}

async function compare(password, hash) {
  return await bcrypt.compareSync(password, hash);
}

module.exports = { hash, compare };
