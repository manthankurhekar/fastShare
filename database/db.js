const mongoose = require('mongoose');
require('dotenv').config();

const databaseConnection = () => {
      const connection = mongoose.connect(process.env.MONGO_CONNECTION_URL);
      connection.then(() => {
            console.log("Database Connected");
      }).catch((err) => {
            console.log("Connection Failed");
      });
};

module.exports = databaseConnection;