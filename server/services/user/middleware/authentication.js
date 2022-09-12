const { verifyToken } = require("../helper/jwt");
const { User } = require("../models/index");

async function Authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "NoToken" };
    }
    console.log("masooooooooooooooooooook");
    const payload = verifyToken(access_token);
    console.log(payload, "cokkkkkkkkkkkkkkkkkkkkks");
    const findUser = await User.findByPk(+payload.id);

    if (!findUser) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: findUser.id,
      role: findUser.role,
      email: findUser.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = Authentication;
