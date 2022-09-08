const { Magnet } = require("../models");

async function magnetAuthorization(req, res, next) {
  try {
    const { magnetId } = req.params;
    const { UserId } = req.headers;
    const targetMagnet = await Magnet.findOne({
      where: {
        id: magnetId,
      },
    });
    if (!targetMagnet) {
      throw { name: "magnetNotFound" };
    }
    if (UserId !== targetMagnet.UserId) {
      throw { name: "magnetUnauthorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { magnetAuthorization };
