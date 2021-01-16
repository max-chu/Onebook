const { DataTypes } = require("sequelize-cockroachdb");

module.exports = (sequelize) => {
  sequelize.define("tag", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    tag_name: {
      allowNull: false,
      type: DataTypes.STRING(50),
    }
  });
};