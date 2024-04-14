/**
 * @swagger
 * tags:
 *  name: Blogs
 *  description: Blogs Section Routes & Modules
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                  text:
 *                      type: string
 *                  short_text:
 *                      type: string
 *                  tags:
 *                      type: string
 *                      example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  category:
 *                      type: string
 *                  image:
 *                      type: file
 *          UpdateBlog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  text:
 *                      type: string
 *                  short_text:
 *                      type: string
 *                  tags:
 *                      type: string
 *                      example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  category:
 *                      type: string
 *                  image:
 *                      type: file
 *
 *
 *
 *
 *
 */


/**
 * @swagger
 * /blog :
 *  post:
 *      tags: [Blogs]
 *      summary: Create Blog
 *      description: Create Blog
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                $ref: "#/components/schemas/CreateBlog"
 *
 *      responses:
 *          201:
 *              description: Created
 *
 *
 */

/**
 * @swagger
 * /blog :
 *  get:
 *    tags: [Blogs]
 *    summary: List Blogs
 *    description: List all blogs
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: NotFound
 */

/**
 * @swagger
 * /blog/{id}:
 *  get:
 *    tags: [Blogs]
 *    summary: Get Blog
 *    description: Get blog by id
 *    parameters:
 *    -     in: path
 *          name: id
 *          required: true
 *          type: string
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: NotFound
 *      500:
 *        description: Internal Server Error
 *
 */


/**
 * @swagger
 * /blog/{id}:
 *  delete:
 *    tags: [Blogs]
 *    summary: Delete Blog
 *    description: Delete blog by id
 *    parameters:
 *    -     name: id
 *          in: path
 *          required: true
 *          type: string
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: NotFound
 *      500:
 *        description: Internal Server Error
 *
 */



/**
 * @swagger
 * /blog/{id} :
 *  patch:
 *      tags: [Blogs]
 *      summary: Edit Blog
 *      description: Edit Blog By id
 *      parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          type: string
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                $ref: "#/components/schemas/UpdateBlog"
 *
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: NotFound
 *          500:
 *              description: Internal Server Error
 *
 *
 */