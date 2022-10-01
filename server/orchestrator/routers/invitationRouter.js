const InvitationController = require("../controllers/invitationController");
const authenticator = require("../middlewares/authenticator");

const router = require("express").Router();

router.post(
  "/event/:eventId/magnet/:magnetId/user/:userId",
  authenticator,
  InvitationController.createInvitation
);
router.get(
  "/your-invitations",
  authenticator,
  InvitationController.getInvitationByUserId
);
router.put(
  "/:invitationId",
  authenticator,
  InvitationController.editInvitation
);

router.put(
  "/:invitationId/accept",
  authenticator,
  InvitationController.acceptInvitation
);
router.put(
  "/:invitationId/reject",
  authenticator,
  InvitationController.removeInvitedParticipant
);

module.exports = router;
