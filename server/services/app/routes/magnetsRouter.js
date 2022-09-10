const MagnetController = require("../controllers/magnetController");
const { magnetAuthorization } = require("../middlewares/authorization");
const { magnetChecker } = require("../middlewares/checker");

const router = require("express").Router();

router.get("/", MagnetController.getAllMagnets);
router.get("/user/:userId", MagnetController.getMagnetByUserId);
router.get("/:magnetId", magnetChecker, MagnetController.findOneMagnet);
router.post("/", MagnetController.createMagnet);
router.put("/:magnetId", magnetAuthorization, MagnetController.editMagnet);
router.delete("/:magnetId", magnetAuthorization, MagnetController.deleteMagnet);
module.exports = router;
