/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category Routes and Modules
 *
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategorey:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                  parent:
 *                      type: string
 *          UpdateCategory:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *
 *
 *
 *
 */

/**
 * @swagger
 * /category :
 *  post:
 *     summary: Create Category
 *     description: create category and subcategoreis
 *     tags: [Category]
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategorey"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategorey"
 *     responses:
 *          201:
 *              description: Created
 *          500:
 *              description: Server Error
 */


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
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/UpdateCategory"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/UpdateCategory"
 *
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: NotFound
 *          500:
 *              description: Server Error
 */




