const { Category } = require("../models");

class CategoryController {
  static async getAllCategory(req, res, next) {
    try {
      const categories = await Category.findAll();
      //   console.log(categories);
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name, image } = req.body;
      const createdCategory = await Category.create({
        name,
        image,
      });
      res.status(201).json({ message: "Successfully created new category" });
    } catch (error) {
      next(error);
    }
  }

  static async editCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const { name, image } = req.body;
      if (!name) {
        throw { name: "emptyCatName" };
      }
      if (!image) {
        throw { name: "emptyCatImg" };
      }
      const editedCategory = await Category.update(
        {
          name,
          image,
        },
        {
          where: {
            id: categoryId,
          },
        }
      );
      res.status(200).json({ message: "Successfully edited category" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const deleteCategory = await Category.destroy({
        where: {
          id: categoryId,
        },
      });
      res.status(200).json({ message: "Successfully deleted category" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
