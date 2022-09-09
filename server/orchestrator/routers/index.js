const router = require('express').Router()
const userRouter = require('./userRouter.js')
const categoryRouter = require('./categoryRouter.js')

router.use("/users", userRouter)
router.use("/categories", categoryRouter)

module.exports = router