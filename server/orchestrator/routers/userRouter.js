const userRouter = require('express').Router()
const UserController = require('../controllers/UserController.js')
const authenticator = require("../middlewares/authenticator");


userRouter.get("/", UserController.readAllUser)
userRouter.post("/", UserController.createUser)
userRouter.get("/:id", UserController.showUser) 
userRouter.get("/my-profile", authenticator, UserController.showUser) 
userRouter.put('/:id', UserController.updateUser)
userRouter.delete('/:id', UserController.deleteUser)

userRouter.post("/register", UserController.registerAdmin);
userRouter.post("/login", UserController.loginAdmin);

userRouter.post("/public/register", UserController.registerVisitor);
userRouter.post("/public/login", UserController.loginVisitor);

module.exports = userRouter;
