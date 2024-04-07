const blogController = require("../../http/controllers/blog/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const {
  VerifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: Blogs
 *  description: Blogs Section Routes & Modules
 */

/**
 * @swagger
 * /blog :
 *  post:
 *      tags: [Blogs]
 *      summary: Create Blog
 *      description: Create Blog
 *      consumes:
 *         - multipart/form-data
 *      parameters:
 *      -   in: header
 *          example: Bearer token...
 *          name: access-token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE0NDA0ODAzMCIsImlhdCI6MTcxMjA3MDcwMywiZXhwIjoxNzEyMDc0MzAzfQ.gxgRyPnaL2jmN6_2XK_kENVxkUeK4NbZCfRPKEkl6qg
 *          type: string
 *          required: true
 *      -   name:  title
 *          required: true
 *          type: string
 *          in: formData
 *      -   name:  text
 *          required: true
 *          type: string
 *          in: formData
 *      -   name:  short_text
 *          required: true
 *          type: string
 *          in: formData
 *      -   name:  tags
 *          example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *          type: string
 *          in: formData
 *      -   name:  category
 *          required: true
 *          type: string
 *          in: formData
 *      -   name:  image
 *          required: true
 *          type: file
 *          in: formData
 *      responses:
 *          201:
 *              description: Created
 *
 *
 */

router.post(
  "/",
  uploadFile.single("image"),
  stringToArray("tags"),
  blogController.createBlog
);

/**
 * @swagger
 * /blog :
 *  get:
 *    tags: [Blogs]
 *    summary: List Blogs
 *    description: List all blogs
 *    parameters:
 *    -     in: header
 *          name: access-token
 *          required: true
 *          type : string
 *          value :  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE0NDA0ODAzMCIsImlhdCI6MTcxMjA3MDcwMywiZXhwIjoxNzEyMDc0MzAzfQ.gxgRyPnaL2jmN6_2XK_kENVxkUeK4NbZCfRPKEkl6qg
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: NotFound
 */

router.get("/", blogController.ListAllBlogs);

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
 *    -     in: header
 *          name: access-token
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
router.get("/:id", blogController.getSingelBlog);

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
 *    -     name: access-token
 *          in: header
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
router.delete("/:id", blogController.deleteBlogById);

/**
 * @swagger
 * /blog/{id} :
 *  patch:
 *      tags: [Blogs]
 *      summary: Edit Blog
 *      description: Edit Blog By id
 *      consumes:
 *         - multipart/form-data
 *      parameters:
 *      -   in: path
 *          name: id
 *          required: true
 *          type: string
 *      -   in: header
 *          example: Bearer token...
 *          name: access-token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE0NDA0ODAzMCIsImlhdCI6MTcxMjA3MDcwMywiZXhwIjoxNzEyMDc0MzAzfQ.gxgRyPnaL2jmN6_2XK_kENVxkUeK4NbZCfRPKEkl6qg
 *          type: string
 *          required: true
 *      -   name:  title
 *          type: string
 *          in: formData
 *      -   name:  text
 *          type: string
 *          in: formData
 *      -   name:  short_text
 *          type: string
 *          in: formData
 *      -   name:  tags
 *          example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *          type: string
 *          in: formData
 *      -   name:  category
 *          type: string
 *          in: formData
 *      -   name:  image
 *          type: file
 *          in: formData
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

router.patch(
  "/:id",
  uploadFile.single("image"),
  stringToArray("tags"),
  blogController.updateBlogById
);




module.exports = {
  BlogRoutes: router,
};
