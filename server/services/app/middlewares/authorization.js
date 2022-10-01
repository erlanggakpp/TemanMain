const { Magnet, Invitation, User, Request } = require("../models");

async function ageAuthorizationBeforeCreateInvitation(req, res, next) {
  try {
    // console.log(req.baseUrl);
    // console.log("MASUK AUTH");0
    const { target_user_age, gender } = req.headers;
    const { magnetId } = req.params;
    const targetMagnet = await Magnet.findByPk(magnetId);
    if (+targetMagnet.ageRequirement > +target_user_age) {
      if (req.baseUrl === "/invitations") {
        throw { name: "underage" };
      } else {
        throw { name: "underageReq" };
      }
    } else if (
      targetMagnet.specialRequirement !== "All gender" &&
      gender !== targetMagnet.specialRequirement
    ) {
      // console.log(gender, targetMagnet.specialRequirement, "<<<<<<<<<<<<<");
      throw { name: "genderFail" };
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
    const { user_id } = req.headers;
    // console.log(user_id, "<<<<<<<<<<<<<<");
    const targetMagnet = await Magnet.findOne({
      where: {
        id: magnetId,
      },
    });
    if (!targetMagnet) {
      throw { name: "magnetNotFound" };
    }
    if (+user_id !== targetMagnet.UserId) {
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
      include: [{ model: Magnet }],
    });
    // console.log(targetInvitation, "<<<<<<<<<<<<<<<<<");
    // console.log(+user_id, targetInvitation.Magnet.UserId, "<<<<<<<<<<<<<<<<<");
    if (!targetInvitation) {
      throw { name: "invitationNotFound" };
    }
    if (+user_id !== targetInvitation.Magnet.UserId) {
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
      include: [{ model: Magnet }],
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
      include: [{ model: Magnet }],
    });
    // console.log(user_id, "<<<<<<<");
    // console.log(targetRequest.Magnet.User.id, "<<<<<<<<<<<<");
    if (!targetRequest) {
      throw { name: "requestNotFound" };
    }
    if (+user_id !== targetRequest.Magnet.UserId) {
      throw { name: "acceptRequestUnauthorized" };
    }
    if (targetRequest.Magnet.vacantParticipant === 0) {
      throw { name: "magnetCurrentlyClosed" };
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
      include: [{ model: Magnet }],
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
      include: [{ model: Magnet }],
    });
    if (!targetRequest) {
      throw { name: "requestNotFound" };
    }
    // console.log(user_id, targetRequest.Magnet.UserId, "<<<<<<<");
    // console.log(targetRequest.Magnet.vacantParticipant, "VACANT <<<<<<<<<<<<");
    if (+user_id !== targetRequest.Magnet.UserId) {
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
