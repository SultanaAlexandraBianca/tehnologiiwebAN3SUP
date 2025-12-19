const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const SearchResult = sequelize.define("SearchResult", {
  title: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  snippet: { type: DataTypes.TEXT, allowNull: true }
});

module.exports = SearchResult;
