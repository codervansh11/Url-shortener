const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Url = sequelize.define("Url", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  longUrl: {
    type: DataTypes.STRING(2000),
    allowNull: false,
    validate: { isUrl: true }
  },
  shortCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clickCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  customAlias: {
    type: DataTypes.STRING,
    allowNull: true
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: "Urls",
  timestamps: true,
  indexes: [
    { unique: true, fields: ['shortCode'] },
    { unique: true, fields: ['customAlias'] }
  ]
});

module.exports = Url;
