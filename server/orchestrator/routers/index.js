const router = require('express').Router()
const userRouter = require('./userRouter.js')

router.use("/users", userRouter)
module.exports = router