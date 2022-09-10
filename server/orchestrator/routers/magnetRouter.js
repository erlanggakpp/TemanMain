const magnetRouter = require("express").Router();
const MagnetController = require("../controllers/MagnetController");
const authenticator = require("../middlewares/authenticator");

magnetRouter.get('/', MagnetController.readAllMagnet)
magnetRouter.get('/user', authenticator, MagnetController.readMagnetById)
magnetRouter.post("/", authenticator, MagnetController.createMagnet)
magnetRouter.get('/:magnetId', MagnetController.showMagnet)
magnetRouter.put('/:magnetId', authenticator, MagnetController.updateMagnet)
magnetRouter.delete('/:magnetId', authenticator, MagnetController.deleteMagnet)

module.exports = magnetRouter