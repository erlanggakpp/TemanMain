"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require('../helper/bcryptjs.js')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Event, { foreignKey: "AdminId" });
      // User.hasMany(models.Request, { foreignKey: "UserId" });
      // User.hasMany(models.Invitation, { foreignKey: "UserId" });
      // User.hasMany(models.Magnet, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "email already exists"
        },
        validate: {
          notEmpty: {
            msg : "email is required"
          },
          notNull: {
            msg: "email is required"
          },
          isEmail: {
            msg: "wrong email format"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg : "password is required"
          },
          notNull: {
            msg: "password is required"
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg : "first name is required"
          },
          notNull: {
            msg: "first name is required"
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg : "last name is required"
          },
          notNull: {
            msg: "last name is required"
          }
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg : "address is required"
          },
          notNull: {
            msg: "address is required"
          }
        }
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg : "birth date is required"
          },
          notNull: {
            msg: "birth date is required"
          }
        }
      },
      profilePict: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg : "profile picture is required"
          },
          notNull: {
            msg: "profile picture is required"
          }
        }
      },
      instagramAccount: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg : "instagram account is required"
          },
          notNull: {
            msg: "instagram account is required"
          }
        }
      },
      twitterAccount: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg : "twitter account is required"
          },
          notNull: {
            msg: "twitter account is required"
          }
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg : "phone number is required"
          },
          notNull: {
            msg: "phone number is required"
          }
        }
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg : "gender is required"
          },
          notNull: {
            msg: "gender is required"
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg : "role is required"
          },
          notNull: {
            msg: "role is required"
          }
        }
      } 
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hashPassword(instance.password)
        },
        beforeUpdate(instance, options) {
          instance.password = hashPassword(instance.password)
        }
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
