const CategoryController = require("../controllers/categoryController");
const { categoryChecker } = require("../middlewares/checker");

const router = require("express").Router();

CategoryController;
router.get("/", CategoryController.getAllCategory);
router.post("/", CategoryController.createCategory);
router.put("/:categoryId", categoryChecker, CategoryController.editCategory);
router.get(
  "/:categoryId",
  categoryChecker,
  CategoryController.fetchOneCategory
);
router.delete(
  "/:categoryId",
  categoryChecker,
  CategoryController.deleteCategory
);

module.exports = router;
