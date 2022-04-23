"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Outlet.belongsTo(models.User);
    }
  }
  Outlet.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please enter user id",
          },
          notNull: {
            msg: "please enter user id",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name of outlet must be filled!",
          },
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        defaultValue: "https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        isIn: [[true, false]],
      },
    },
    {
      sequelize,
      modelName: "Outlet",
    }
  );
  return Outlet;
};
