const router = require("express").Router();
const RequestController = require("../controllers/requestController");
const {
  ageAuthorizationBeforeCreateInvitation,
  requestAuthorization,
  acceptRequestAuthorization,
  acceptRequestAuthorization2,
} = require("../middlewares/authorization");

router.get("/user/:userId", RequestController.getRequestByUserId);
router.post(
  "/event/:eventId/magnet/:magnetId",
  ageAuthorizationBeforeCreateInvitation,
  RequestController.createRequest
);
router.put(
  "/:requestId",
  requestAuthorization,
  RequestController.editRequestDescription
);
router.delete(
  "/:requestId",
  requestAuthorization,
  RequestController.editRequestDescription
);

router.put(
  "/:requestId/accept",
  acceptRequestAuthorization,
  RequestController.acceptRequest
);
router.put(
  "/:requestId/reject",
  acceptRequestAuthorization2,
  RequestController.removeRequested
);

module.exports = router;
