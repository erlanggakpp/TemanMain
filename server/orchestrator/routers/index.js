const router = require("express").Router();
const userRouter = require("./userRouter.js");
const categoryRouter = require("./categoryRouter.js");
const eventRouter = require("./eventRouter");
const magnetRouter = require("./magnetRouter.js")

router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/events", eventRouter);
router.use("/magnets", magnetRouter)

module.exports = router;
