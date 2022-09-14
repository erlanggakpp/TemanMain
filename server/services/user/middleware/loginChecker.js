const { User } = require("../models/index");

const loginAsAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const targetUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!targetUser) {
      throw { name: "InvalidEmailOrPassword" };
    }
    if (targetUser.role !== "Admin") {
      throw { name: "notAllowedtoLogin" };
    }
    next();
  } catch (error) {
    next(error);
  }
};
const loginAsVisitor = async (req, res, next) => {
  try {
    const { email } = req.body;
    const targetUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!targetUser) {
      throw { name: "InvalidEmailOrPassword" };
    }
    if (targetUser.role !== "Visitor") {
      throw { name: "notAllowedtoLogin" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { loginAsAdmin, loginAsVisitor };
