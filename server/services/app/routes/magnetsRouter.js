const router = require("express").Router();
const MagnetController = require("../controllers/magnetController");
const { magnetAuthorization } = require("../middlewares/authorization");
const { magnetChecker, createMagnetCheker } = require("../middlewares/checker");

router.get("/", MagnetController.getAllMagnets);
router.get("/user", MagnetController.getMagnetByUserId);
router.get("/:magnetId", magnetChecker, MagnetController.findOneMagnet);
router.post("/", createMagnetCheker, MagnetController.createMagnet);
router.put("/:magnetId", magnetAuthorization, MagnetController.editMagnet); //authen
router.delete("/:magnetId", magnetAuthorization, MagnetController.deleteMagnet); //authen
module.exports = router;
