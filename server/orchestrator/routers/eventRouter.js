const EventController = require("../controllers/eventController");
const authenticator = require("../middlewares/authenticator");

const router = require("express").Router();

router.get("/", EventController.getAllEvents);
router.get("/:eventId", authenticator, EventController.findOneEvent);

module.exports = router;
