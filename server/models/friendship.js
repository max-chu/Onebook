const { DataTypes } = require("sequelize-cockroachdb");

module.exports = (sequelize) => {
  sequelize.define("friendship", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    last_name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    avatar_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    notes: {
      allowNull: true,
      type: DataTypes.TEXT
    }
  });
};