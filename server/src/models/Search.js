const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Search = sequelize.define("Search", {
  query: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Search;
