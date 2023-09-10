"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contracts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contracts.hasOne(models.Acceptances, { foreignKey: "contract_id" });
    }
  }
  Contracts.init({
      contract_number: DataTypes.STRING,
      contract_name: DataTypes.STRING(800),
      sign_date: DataTypes.DATE,
      contract_value: DataTypes.INTEGER,
      customer_id: DataTypes.STRING,
      status: DataTypes.INTEGER,
      description: DataTypes.STRING(1000),
    },
    {
      sequelize,
      modelName: "Contracts",
    }
  );
  return Contracts;
};
