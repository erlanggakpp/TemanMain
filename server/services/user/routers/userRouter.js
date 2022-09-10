const userRouter = require("express").Router();
const UserController = require("../controllers/UserController.js");
const Authentication = require("../middleware/authentication.js");

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

userRouter.post("/public/register", UserController.register);
userRouter.post("/public/login", UserController.login);

userRouter.use(Authentication);
userRouter.get("/tokenChecker", UserController.findLoggedUser);
userRouter.get("/", UserController.readAllUser);
userRouter.post("/", UserController.createUser);
userRouter.get("/:id", UserController.showUser);
userRouter.put("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);

module.exports = userRouter;
