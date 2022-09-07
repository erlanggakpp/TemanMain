const userRouter = require('express').Router()
const UserController = require('../controllers/UserController.js')

userRouter.get('/', UserController.readAllUser)
userRouter.post('/', UserController.createUser)
userRouter.get('/:id', UserController.showUser)
userRouter.put('/:id', UserController.updateUser)
userRouter.delete('/:id', UserController.deleteUser)

userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)

userRouter.post('/public/register', UserController.register)
userRouter.post('/public/login', UserController.login)

module.exports = userRouter