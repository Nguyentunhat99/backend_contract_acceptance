"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Acceptances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Acceptances.belongsTo(models.Contracts, { foreignKey: "contract_id" }); 
    }
  }
  Acceptances.init(
    {
      contract_id: DataTypes.INTEGER,
      acceptance_name: DataTypes.STRING,
      acceptance_amount: DataTypes.INTEGER,
      volume: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      acceptance_date: DataTypes.DATE,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Acceptances",
    }
  );
  return Acceptances;
};
