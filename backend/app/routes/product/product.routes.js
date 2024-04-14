const productController = require("../../http/modules/admin/products/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.post(
  "/",
  uploadFile.array("images", 10),
  stringToArray("tags"),
  stringToArray("colors"),
  productController.addProducts
);

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.delete("/:id", productController.deleteProductById);

router.patch(
  "/:id",
  uploadFile.array("images", 10),
  stringToArray("tags"),
  stringToArray("colors"),
  productController.updateProductById
);

module.exports = {
  ProductRoutes: router,
};
