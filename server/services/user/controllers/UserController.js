const { User } = require("../models/index.js");
const { createToken } = require("../helper/jwt.js");
const { comparePassword } = require("../helper/bcryptjs.js");
const { AgeFormat } = require("../helper/customFormat.js");

class UserController {
  static async readAllUser(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async readAllUserPublic(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        address,
        birthdate,
        profilePict,
        instagramAccount,
        twitterAccount,
        phoneNumber,
        gender,
        role,
      } = req.body;

      const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
        address,
        birthdate,
        profilePict,
        instagramAccount,
        twitterAccount,
        phoneNumber,
        gender,
        role,
      });

      delete newUser.dataValues.createdAt;
      delete newUser.dataValues.updatedAt;
      delete newUser.dataValues.password;

      res.status(201).json({
        message: `Sucessfully created user ${newUser.firstName}`,
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showUser(req, res, next) {
    try {
      const { id } = req.params;

      const findUser = await User.findByPk(+id, {
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });

      if (!findUser) {
        throw { name: "NotFound" };
      }

      res.status(200).json(findUser);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      let {
        email,
        password,
        firstName,
        lastName,
        address,
        birthdate,
        profilePict,
        instagramAccount,
        twitterAccount,
        phoneNumber,
        gender,
        role,
      } = req.body;

      let findUser = await User.findByPk(+id, {
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });

      if (!password) {
        password = findUser.password;
      }

      if (!findUser) {
        throw { name: "NotFound" };
      }

      await User.update(
        {
          email,
          password,
          firstName,
          lastName,
          address,
          birthdate,
          profilePict,
          instagramAccount,
          twitterAccount,
          phoneNumber,
          gender,
          role,
        },
        { where: { id }, individualHooks: true }
      );

      findUser = await User.findByPk(+id, {
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });

      res.status(200).json({
        message: `Successfully updated user ${findUser.firstName}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const findUser = await User.findByPk(+id, {
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });

      if (!findUser) {
        throw { name: "NotFound" };
      }

      await User.destroy({ where: { id } });

      res.status(200).json({
        message: `Successfully deleted user ${findUser.firstName}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        address,
        birthdate,
        profilePict,
        instagramAccount,
        twitterAccount,
        phoneNumber,
        gender,
      } = req.body;
      const endpoint = req.baseUrl + req.path;
      let role = "";

      if (endpoint === "/users/register") {
        role = "Admin";
      } else if (endpoint === "/users/public/register") {
        role = "Visitor";
      }

      const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
        address,
        birthdate,
        profilePict,
        instagramAccount,
        twitterAccount,
        phoneNumber,
        gender,
        role,
      });

      delete newUser.dataValues.createdAt;
      delete newUser.dataValues.updatedAt;
      delete newUser.dataValues.password;

      res.status(201).json({
        message: `Sucessfully register user ${newUser.firstName}`,
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "RequiredEmailPassword" };
      }

      const findUser = await User.findOne({ where: { email } });

      if (!findUser) {
        throw { name: "InvalidEmailOrPassword" };
      }

      const comparePass = comparePassword(password, findUser.password);

      if (!comparePass) {
        throw { name: "InvalidEmailOrPassword" };
      }

      const payload = {
        id: findUser.id,
        role: findUser.role,
        email: findUser.email,
      };

      const access_token = createToken(payload);
      const age = AgeFormat(findUser.birthdate);

      res.status(200).json({
        message: `Successfully login as ${findUser.firstName}`,
        access_token,
        age,
        gender: findUser.gender,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findLoggedUser(req, res, next) {
    try {
      const { id } = req.user;
      // console.log(id, "<<<<<<<");

      const findUser = await User.findByPk(+id, {
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      });
      res.status(200).json(findUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
