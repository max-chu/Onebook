const { DataTypes } = require("sequelize-cockroachdb");

module.exports = (sequelize) => {
  sequelize.define("address", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    street1: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    street2: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    province: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    postal_code: {
      allowNull: true,
      type: DataTypes.STRING(12),
    },
    country: {
      allowNull: true,
      type: DataTypes.STRING
    }
  });
};