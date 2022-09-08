const { Event, Category } = require("../models");

async function eventChecker(req, res, next) {
  try {
    const { eventId } = req.params;
    const targetEvent = await Event.findOne({
      where: {
        id: eventId,
      },
    });
    if (!targetEvent) {
      throw { name: "eventNotFound" };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function categoryChecker(req, res, next) {
  try {
    const { categoryId } = req.params;
    const targetCategory = await Category.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!targetCategory) {
      throw { name: "categoryNotFound" };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { eventChecker, categoryChecker };
