const categoryController = require("../../http/modules/admin/category/category.controller");

const router = require("express").Router();

router.post("/", categoryController.createCategory);

router.get("/parents", categoryController.getAllParents);

router.get("/:parentId", categoryController.getChildOfParents);

router.get("/", categoryController.listAllCategory);

router.delete("/delete/:id", categoryController.removeCategory);

router.patch("/:id", categoryController.editCategory);

module.exports = {
  CategoryRoutes: router,
};
