const RequestController = require("../controllers/requestController");
const authenticator = require("../middlewares/authenticator");
const router = require("express").Router();

router.post(
  "/event/:eventId/magnet/:magnetId",
  authenticator,
  RequestController.createRequest
);

router.get(
  "/your-requests",
  authenticator,
  RequestController.getRequestByUserId
);
router.put("/:requestId", authenticator, RequestController.editRequest);
router.put(
  "/:requestId/accept",
  authenticator,
  RequestController.acceptRequest
);
router.put(
  "/:requestId/reject",
  authenticator,
  RequestController.removeRequested
);

module.exports = router;
