const router = require('express').Router()
const userRouter = require('./userRouter.js')
const errorHandler = require('../middleware/errorHandler.js')

router.use('/users', userRouter)

router.use(errorHandler)

module.exports = router