const MagnetController = require("../controllers/magnetController");
const { magnetAuthorization } = require("../middlewares/authorization");

const router = require("express").Router();

router.get("/", MagnetController.getAllMagnets);
router.post("/", MagnetController.createMagnet);
router.put("/:magnetId", magnetAuthorization, MagnetController.editMagnet);
router.delete("/:magnetId", magnetAuthorization, MagnetController.deleteMagnet);
module.exports = router;
