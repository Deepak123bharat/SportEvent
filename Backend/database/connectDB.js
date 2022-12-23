const mongoose = require("mongoose");
require("dotenv").config({
  path: "../.env",
});
async function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DB_CONNECTTION_STRING, (err) => {
      if (err) {
        console.log("Error conencting to DB");
        reject(err);
      } else {
        console.log("Successfully connected to DB");
        resolve();
      }
    });
  });
}

module.exports = {
  connectDatabase,
};
