const userRouter = require("express").Router();
const UserController = require("../controllers/UserController.js");
const Authentication = require("../middleware/authentication.js");
const {
  loginAsVisitor,
  loginAsAdmin,
} = require("../middleware/loginChecker.js");

userRouter.post("/register", UserController.register);
userRouter.post("/login", loginAsAdmin, UserController.login);

userRouter.post("/public/register", UserController.register);
userRouter.post("/public/login", loginAsVisitor, UserController.login);
userRouter.get("/public", UserController.readAllUserPublic);

userRouter.use(Authentication);
userRouter.get("/tokenChecker", UserController.findLoggedUser);
userRouter.get("/", UserController.readAllUser);
userRouter.post("/", UserController.createUser);
userRouter.get("/:id", UserController.showUser);
userRouter.put("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);

module.exports = userRouter;
