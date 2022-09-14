const MagnetController = require("../controllers/magnetController");
const { magnetAuthorization } = require("../middlewares/authorization");
const { magnetChecker } = require("../middlewares/checker");

const router = require("express").Router();

router.get("/", MagnetController.getAllMagnets);
router.get("/user", MagnetController.getMagnetByUserId);
router.get("/:magnetId", magnetChecker, MagnetController.findOneMagnet);
router.post("/", MagnetController.createMagnet);
router.put("/:magnetId", magnetAuthorization, MagnetController.editMagnet); //authen
router.delete("/:magnetId", magnetAuthorization, MagnetController.deleteMagnet); //authen
module.exports = router;
