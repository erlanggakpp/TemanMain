const router = require("express").Router();
const userRouter = require("./userRouter.js");
const categoryRouter = require("./categoryRouter.js");
const eventRouter = require("./eventRouter");
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/events", eventRouter);

module.exports = router;
