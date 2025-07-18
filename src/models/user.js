"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { serverConfig } = require("../config");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 20],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(function encrpt(user) {
    const encrptedPassword = bcrypt.hashSync(
      user.password,
      +serverConfig.SALT_ROUNDS
    );
    user.password = encrptedPassword;
  });

  return User;
};
