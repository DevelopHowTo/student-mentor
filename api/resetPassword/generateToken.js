const crypto = require("crypto");

async function generateToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buf) => {
      if (err) {
        reject("error generating token");
      }
      const token = buf.toString("hex");
      resolve(token);
    });
  });
}

module.exports.generateToken = generateToken;