const EventController = require("../controllers/eventController");

const router = require("express").Router();

router.get("/", EventController.getAllEvents);
router.post("/", EventController.createEvent);
router.put("/:eventId", EventController.editEvent);
router.delete("/:eventId", EventController.deleteEvent);
module.exports = router;
