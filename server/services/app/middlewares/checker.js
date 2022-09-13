const { Event, Category, Invitation, Magnet, Request } = require("../models");

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
async function magnetChecker(req, res, next) {
  try {
    const { magnetId } = req.params;
    const targetMagnet = await Magnet.findOne({
      where: {
        id: magnetId,
      },
    });
    console.log(targetMagnet, ":INIII TARGETT");
    if (!targetMagnet) {
      throw { name: "magnetNotFound" };
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

async function invitationChecker(req, res, next) {
  try {
    const { invitationId } = req.params;
    const targetInvitation = await Invitation.findByPk(invitationId);
    if (!targetInvitation) {
      throw { name: "invitationNotFound" };
    }
    next();
  } catch (error) {
    next(error);
  }
}
async function requestChecker(req, res, next) {
  try {
    const { requestId } = req.params;
    const targetRequest = await Request.findByPk(requestId);
    if (!targetRequest) {
      throw { name: "requestNotFound" };
    }
    next();
  } catch (error) {
    next(error);
  }
}
async function alreadyMadeRequest(req, res, next) {
  try {
    const { magnetId } = req.params;
    const { user_id } = req.headers;
    const targetRequest = await Request.findOne({
      where: {
        MagnetId: magnetId,
        UserId: user_id,
      },
    });
    if (targetRequest) {
      throw { name: "alreadyFoundReq" };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
async function alreadyMadeInvitation(req, res, next) {
  try {
    const { magnetId, userId } = req.params;
    const targetInvitation = await Invitation.findOne({
      where: {
        MagnetId: magnetId,
        UserId: userId,
      },
    });
    if (targetInvitation) {
      throw { name: "alreadyFoundInv" };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  eventChecker,
  categoryChecker,
  invitationChecker,
  magnetChecker,
  alreadyMadeRequest,
  alreadyMadeInvitation,
  requestChecker,
};
