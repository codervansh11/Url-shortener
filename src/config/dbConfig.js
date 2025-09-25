const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mssql",
    logging: false, // disable SQL logs in console
    dialectOptions: {
      options: { encrypt: true } // if using Azure
    }
  }
);

sequelize.authenticate()
  .then(() => console.log("✅ DB connected successfully"))
  .catch(err => console.error("❌ DB connection error:", err));

module.exports = sequelize;
