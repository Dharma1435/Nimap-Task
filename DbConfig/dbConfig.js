const { Sequelize, Model, DataTypes } = require("sequelize");

// Create Sequelize connection instance
const sequelizeCon = new Sequelize("mysql://root@localhost/nimaptask");

(async () => {
  try {
    console.log("Attempting to connect to the database...");
    await sequelizeCon.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
})();

module.exports = { sequelizeCon, Model, DataTypes };
