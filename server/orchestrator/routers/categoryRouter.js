const categoryRouter = require("express").Router();
const CategoryController = require("../controllers/CategoryController.js");

categoryRouter.get("/", CategoryController.readAllCategory);
categoryRouter.post("/", CategoryController.createCategory);
categoryRouter.put("/:categoryId", CategoryController.updateCategory);
categoryRouter.get("/:categoryId", CategoryController.fetchOneCategory);
categoryRouter.delete("/:categoryId", CategoryController.deleteCategory);

module.exports = categoryRouter;
