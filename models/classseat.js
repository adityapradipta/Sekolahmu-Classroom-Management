"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClassSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClassSeat.init(
    {
      seat: DataTypes.STRING,
      student_name: DataTypes.STRING,
      ClassId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ClassSeat",
    }
  );
  ClassSeat.associate = function (models) {
    ClassSeat.belongsTo(models.User, { foreignKey: "UserId", targetKey: "id" });
    ClassSeat.belongsTo(models.Class, {
      foreignKey: "ClassId",
      targetKey: "id",
    });
  };
  return ClassSeat;
};
