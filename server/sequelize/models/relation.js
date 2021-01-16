const { DataTypes } = require("sequelize-cockroachdb");

module.exports = (sequelize) => {
  sequelize.define("relation", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    
  });
};