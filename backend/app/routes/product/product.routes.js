const productController = require("../../http/controllers/products/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      name: Product
 *      description: Products Modules and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   category
 *                  -   price
 *                  -   count
 *                  -   discount
 *
 *              properties:
 *                  title:
 *                      type: string
 *                  short_text:
 *                      type: string
 *                  text:
 *                      type: string
 *                  category:
 *                      type: string
 *                  price:
 *                      type: number
 *                  discount:
 *                      type: number
 *                  count:
 *                      type: number
 *                  images:
 *                      type: array
 *                      items:
 *                        type: string
 *                        format: binary
 *                  tags:
 *                      type: array
 *                  height:
 *                      type: number
 *                  width:
 *                      type: number
 *                  weight:
 *                      type: number
 *                  length:
 *                      type: number
 *                  color:
 *                      type: array
 *                      items:
 *                        type: string
 *
 *
 *
 *
 *
 */

/**
 * @swagger
 *  /product:
 *    post:
 *        summary: Add Product
 *        description: Add new Product
 *        tags: [Product]
 *        requestBody:
 *            required: true
 *            content:
 *                multipart/form-data:
 *                    schema:
 *                        $ref: "#/components/schemas/Product"
 *        responses:
 *            201:
 *                description: Created
 *
 */

router.post(
  "/",
  uploadFile.array("images",10),
  stringToArray("tags"),
  stringToArray("color"),
  productController.addProducts
);

/**
 * @swagger
 *  /product:
 *    get:
 *        tags: [Product]
 *        summary: Get Products
 *        description: Lis All Added Products
 *        responses:
 *            200:
 *              description: Success
 *            404:
 *              description: NotFound
 */
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProductById);
router.patch("/:id", productController.editProductById);

module.exports = {
  ProductRoutes: router,
};
