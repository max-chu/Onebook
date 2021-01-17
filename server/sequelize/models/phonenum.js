const { DataTypes } = require("sequelize-cockroachdb");

module.exports = (sequelize) => {
  sequelize.define("phonenum", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    phone_num: {
      allowNull: true,
      type: DataTypes.STRING(12),
    },
    type: {
      allowNull: true,
      type: DataTypes.STRING(50),
    }
  });
};