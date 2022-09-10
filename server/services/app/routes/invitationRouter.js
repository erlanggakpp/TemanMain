const InvitationController = require("../controllers/invitationController");
const {
  invitationAuthorization,
  acceptInvitationAuthorization,
  ageAuthorizationBeforeCreateInvitation,
} = require("../middlewares/authorization");
const { magnetChecker, eventChecker } = require("../middlewares/checker");

const router = require("express").Router();
router.post(
  "/event/:eventId/magnet/:magnetId/user/:userId",
  eventChecker,
  magnetChecker,
  ageAuthorizationBeforeCreateInvitation,
  InvitationController.createInvitation
);
router.get("/user/:userId", InvitationController.getInvitationByUserId);
router.put(
  "/:invitationId",
  invitationAuthorization,
  InvitationController.editInvitationDescription
);
router.delete(
  "/:invitationId",
  invitationAuthorization,
  InvitationController.deleteInvitation
);
router.put(
  "/:invitationId/accept",
  acceptInvitationAuthorization,
  InvitationController.acceptInvitation
);
router.put(
  "/:invitationId/reject",
  invitationAuthorization,
  InvitationController.removeInvitedParticipant
);

module.exports = router;
