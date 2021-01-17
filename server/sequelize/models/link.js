const { DataTypes } = require("sequelize-cockroachdb");

module.exports = (sequelize) => {
  sequelize.define("link", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    platform: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    username: {
      allowNull: true,
      type: DataTypes.STRING,
    }
  });
};