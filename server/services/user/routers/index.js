const router = require("express").Router();
const userRouter = require("./userRouter.js");
const errorHandler = require("../middleware/errorHandler.js");
const chatRouter = require("../routers/chatRouter");

router.use("/users", userRouter);
router.use("/chats", chatRouter);

router.use(errorHandler);

module.exports = router;
