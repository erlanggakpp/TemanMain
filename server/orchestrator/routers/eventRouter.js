const EventController = require("../controllers/eventController");
const authenticator = require("../middlewares/authenticator");

const router = require("express").Router();
router.use(authenticator);
router.get("/", EventController.getAllEvents);
router.post("/", EventController.createEvent);
router.get("/:eventId", EventController.findOneEvent);
router.put("/:eventId", EventController.editEvent);
router.delete("/:eventId", EventController.deleteEvent);
router.get("/category/:categoryId", EventController.getEventsbyCategory);

module.exports = router;
