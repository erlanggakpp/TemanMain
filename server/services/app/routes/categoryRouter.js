const CategoryController = require("../controllers/categoryController");

const router = require("express").Router();

CategoryController;
router.get("/", CategoryController.getAllCategory);
router.post("/", CategoryController.createCategory);
router.put("/:categoryId", CategoryController.editCategory);
router.delete("/:categoryId", CategoryController.deleteCategory);

module.exports = router;
