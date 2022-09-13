const router = require("express").Router();
const CategoryRouter = require("../routes/categoryRouter");
const EventRouter = require("../routes/eventsRouter");
const MagnetRouter = require("../routes/magnetsRouter");
const RequestRouter = require("../routes/requestRouter");
const InvitationRouter = require("../routes/invitationRouter");

router.use("/categories", CategoryRouter);
router.use("/events", EventRouter);
router.use("/magnets", MagnetRouter);
router.use("/requests", RequestRouter);
router.use("/invitations", InvitationRouter);
module.exports = router;
