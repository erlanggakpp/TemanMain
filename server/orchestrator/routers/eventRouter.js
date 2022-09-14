const EventController = require("../controllers/eventController");
const authenticator = require("../middlewares/authenticator");

const router = require("express").Router();
router.get("/", EventController.getAllEvents);
router.get("/:eventId", EventController.findOneEvent);
router.use(authenticator);
router.post("/", EventController.createEvent);
router.put("/:eventId", EventController.editEvent);
router.delete("/:eventId", EventController.deleteEvent);
router.get("/category/:categoryId", EventController.getEventsbyCategory);

module.exports = router;
