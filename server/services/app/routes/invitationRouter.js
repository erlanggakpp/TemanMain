const InvitationController = require("../controllers/invitationController");
const {
  invitationAuthorization,
  acceptInvitationAuthorization,
  ageAuthorizationBeforeCreateInvitation,
  magnetAuthorization,
} = require("../middlewares/authorization");
const {
  magnetChecker,
  eventChecker,
  alreadyMadeInvitation,
  invitationChecker,
} = require("../middlewares/checker");

const router = require("express").Router();
router.post(
  "/event/:eventId/magnet/:magnetId/user/:userId",
  eventChecker,
  magnetChecker,
  ageAuthorizationBeforeCreateInvitation,
  magnetAuthorization,
  alreadyMadeInvitation,
  InvitationController.createInvitation
);
router.get("/user", InvitationController.getInvitationByUserId);
router.put(
  "/:invitationId",
  invitationAuthorization,
  InvitationController.editInvitationDescription
);
router.get(
  "/:invitationId",
  invitationChecker,
  InvitationController.findOneInvitation
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
