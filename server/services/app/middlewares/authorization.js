const { Magnet, Invitation, User, Request } = require("../models");

async function ageAuthorizationBeforeCreateInvitation(req, res, next) {
  try {
    console.log(req.baseUrl);
    const { target_user_age } = req.headers;
    const { magnetId } = req.params;
    const targetMagnet = await Magnet.findByPk(magnetId);
    if (targetMagnet.ageRequirement > target_user_age) {
      if (req.baseUrl === "/invitations") {
        throw { name: "underage" };
      } else {
        throw { name: "underageReq" };
      }
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

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
async function invitationAuthorization(req, res, next) {
  try {
    const { invitationId } = req.params;
    const { user_id } = req.headers;
    const targetInvitation = await Invitation.findOne({
      where: {
        id: invitationId,
      },
      include: [{ model: Magnet, include: [User] }],
    });
    if (!targetInvitation) {
      throw { name: "invitationNotFound" };
    }
    if (+user_id !== targetInvitation.Magnet.User.id) {
      throw { name: "invitationUnauthorized" };
    }
    req.targetMagnetId = targetInvitation.Magnet.id;

    next();
  } catch (error) {
    next(error);
  }
}
async function requestAuthorization(req, res, next) {
  try {
    const { requestId } = req.params;
    const { user_id } = req.headers;
    const targetRequest = await Request.findOne({
      where: {
        id: requestId,
      },
      include: [{ model: Magnet, include: [User] }],
    });
    if (!targetRequest) {
      throw { name: "requestNotFound" };
    }
    if (+user_id !== targetRequest.UserId) {
      throw { name: "requestUnauthorized" };
    }
    req.targetMagnetId = targetRequest.Magnet.id;

    next();
  } catch (error) {
    next(error);
  }
}
async function acceptRequestAuthorization2(req, res, next) {
  try {
    const { requestId } = req.params;
    const { user_id } = req.headers;
    const targetRequest = await Request.findOne({
      where: {
        id: requestId,
      },
      include: [{ model: Magnet, include: [User] }],
    });
    console.log(user_id, "<<<<<<<");
    console.log(targetRequest.Magnet.User.id, "<<<<<<<<<<<<");
    if (!targetRequest) {
      throw { name: "requestNotFound" };
    }
    if (+user_id !== targetRequest.Magnet.User.id) {
      throw { name: "requestUnauthorized" };
    }
    req.targetMagnetId = targetRequest.Magnet.id;

    next();
  } catch (error) {
    next(error);
  }
}
async function acceptInvitationAuthorization(req, res, next) {
  try {
    const { invitationId } = req.params;
    const { user_id } = req.headers;
    // console.log(user_id, "<<<<<<<<<");
    const targetInvitation = await Invitation.findOne({
      where: {
        id: invitationId,
      },
      include: [{ model: Magnet, include: [User] }],
    });
    if (!targetInvitation) {
      throw { name: "invitationNotFound" };
    }
    if (+user_id !== targetInvitation.UserId) {
      throw { name: "acceptInvitationUnauthorized" };
    }
    if (targetInvitation.Magnet.vacantParticipant === 0) {
      throw { name: "magnetCurrentlyClosed" };
    }
    if (targetInvitation.status === "Accepted") {
      throw { name: "alreadyAcceptedInvitation" };
    }
    req.targetMagnetId = targetInvitation.Magnet.id;
    next();
  } catch (error) {
    next(error);
  }
}
async function acceptRequestAuthorization(req, res, next) {
  try {
    const { requestId } = req.params;
    const { user_id } = req.headers;
    const targetRequest = await Request.findOne({
      where: {
        id: requestId,
      },
      include: [{ model: Magnet, include: [User] }],
    });
    if (!targetRequest) {
      throw { name: "requestNotFound" };
    }
    // console.log(user_id, "<<<<<<<");
    // console.log(targetRequest.Magnet.User.id, "<<<<<<<<<<<<");
    if (+user_id !== targetRequest.Magnet.User.id) {
      throw { name: "acceptRequestUnauthorized" };
    }
    if (targetRequest.Magnet.vacantParticipant === 0) {
      throw { name: "magnetCurrentlyClosed" };
    }
    if (targetRequest.status === "Accepted") {
      throw { name: "alreadyAcceptedRequest" };
    }
    req.targetMagnetId = targetRequest.Magnet.id;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  magnetAuthorization,
  invitationAuthorization,
  acceptInvitationAuthorization,
  ageAuthorizationBeforeCreateInvitation,
  requestAuthorization,
  acceptRequestAuthorization,
  acceptRequestAuthorization2,
};
