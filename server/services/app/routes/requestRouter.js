const router = require("express").Router();
const RequestController = require("../controllers/requestController");
const {
  ageAuthorizationBeforeCreateInvitation,
  requestAuthorization,
  acceptRequestAuthorization,
  acceptRequestAuthorization2,
} = require("../middlewares/authorization");
const {
  eventChecker,
  magnetChecker,
  alreadyMadeRequest,
} = require("../middlewares/checker");

router.get("/user", RequestController.getRequestByUserId);
router.post(
  "/event/:eventId/magnet/:magnetId",
  eventChecker,
  magnetChecker,
  ageAuthorizationBeforeCreateInvitation,
  alreadyMadeRequest,
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
  RequestController.deleteRequest
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
