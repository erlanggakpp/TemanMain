const EventController = require("../controllers/eventController");
const { eventChecker, categoryChecker } = require("../middlewares/checker");

const router = require("express").Router();

router.get("/", EventController.getAllEvents);
router.post("/", EventController.createEvent);
router.get("/:eventId", eventChecker, EventController.findOneEvent);
router.get(
  "/category/:categoryId",
  categoryChecker,
  EventController.findEventsByCategory
);
router.put("/:eventId", EventController.editEvent);
router.delete("/:eventId", eventChecker, EventController.deleteEvent);
module.exports = router;
