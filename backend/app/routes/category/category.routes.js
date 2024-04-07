const categoryController = require("../../http/controllers/category/category.controller")

const router = require("express").Router()


/**
 * @swagger
 * tags:
 *  name: Category 
 *  description: Category Routes and Modules
 * 
 */

/**
 * @swagger
 * /category :
 *  post:
 *     summary: Create Category
 *     description: create category and subcategoreis
 *     tags: [Category]
 *     parameters:
 *     -    name: title
 *          type: string
 *          required: true
 *          in: formData
 *     -    name: parent
 *          type: string
 *          in: formData
 *     responses:
 *          201:
 *              description: Created
 *          500:
 *              description: Server Error
 */

router.post("/",categoryController.createCategory)


/**
 * @swagger
 * /category/parents:
 *  get:
 *      summary: Get Parent Categories
 *      tags: [Category]
 *      description: list all parent categories
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: NotFound
 *          500:
 *              description: Server Error
 */
router.get("/parents",categoryController.getAllParents)


/**
 * @swagger
 * /category/{parentId}:
 *  get:
 *      summary: Get Childs of Parent category
 *      tags: [Category]
 *      description: list all childs of specific Parent categories
 *      parameters: 
 *      -   name: parentId
 *          in: path
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: NotFound
 *          500:
 *              description: Server Error
 */
router.get("/:parentId",categoryController.getChildOfParents)


/**
 * @swagger
 * /category :
 *  get:
 *     summary: List Categories
 *     description: List all categories
 *     tags: [Category]
 *     responses:
 *          200:
 *              description: Success
 *          404:
 *              description: NotFound
 */

router.get("/",categoryController.listAllCategory)


/**
 * @swagger
 * /category/delete/{id}:
 *  delete:
 *      summary: Delete Category 
 *      tags: [Category]
 *      description: Delete Category by id
 *      parameters: 
 *      -   name: id
 *          in: path
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: NotFound
 *          500:
 *              description: Server Error
 */
router.delete("/delete/:id",categoryController.removeCategory)


/**
 * @swagger
 * /category/{id}:
 *  patch:
 *      summary: Update Category 
 *      tags: [Category]
 *      description: Update Category by id
 *      parameters: 
 *      -   name: id
 *          in: path
 *          required: true
 *          type: string
 *      -   name: title
 *          required: true
 *          type: string
 *          in: formData
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: NotFound
 *          500:
 *              description: Server Error
 */
router.patch("/:id",categoryController.editCategory)

module.exports = {
    CategoryRoutes : router
}