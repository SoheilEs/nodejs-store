/**
 * @swagger
 *  tags:
 *      name: Courses
 *      description: Courses Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddCourse:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   image
 *                  -   category
 *                  -   type
 *
 *              properties:
 *                  title:
 *                      type: string
 *                  short_text:
 *                      type: string
 *                  text:
 *                      type: string
 *                  image:
 *                      type: file
 *                  category:
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum: [free, cash, vip]
 *                  price:
 *                      type: number
 *                  discount:
 *                      type: number
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *
 *
 */

/**
 * @swagger
 *  definitions:
 *      ListoFCourses:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          example: 661b9757140aa9ae495bc1f6
 *                      title:
 *                          type: string
 *                          example: title of the course
 *                      short_text:
 *                          type: string
 *                          example: short text about course
 *                      text:
 *                          type: string
 *                          example: berief text about course
 *                      status:
 *                          type: string
 *                          example: [free, cash, vip]
 *                      time:
 *                          type: string
 *                          example: "01:22:34"
 *                      price:
 *                          type: number
 *                          example: 250000
 *                      discount:
 *                          type: number
 *                          example: 20
 *                      teacher:
 *                          type: string
 *                          example: soheil Isazade
 *                      studentCount:
 *                          type: integer
 *                      
 *                      
 */

/**
 * @swagger
 *  /courses:
 *      post:
 *          tags: [Courses]
 *          summary: Add a Course
 *          description: Add new course
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/AddCourse"
 *          responses:
 *              201:
 *                  description: Created
 *              400:
 *                  description: BadRequest
 *              401:
 *                  description: Unauthorized
 *              404:
 *                  description: NotFound
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /courses:
 *      get:
 *          tags: [Courses]
 *          summary: Get Courses
 *          description: List All submited Courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title, text, short_text
 *          responses:
 *                200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/ListoFCourses"
 *                404:
 *                  description: NotFound
 *                401:
 *                  description: Unauthorized
 *                500:
 *                  description: Internal Server Error
 *
 */


/**
 * @swagger
 *  /courses/{id}:
 *      get:
 *          tags: [Courses]
 *          summary: Get Course
 *          description: Get Course By Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: id for specified course
 *          responses:
 *                200:
 *                  description: Success
 *                404:
 *                  description: NotFound
 *                401:
 *                  description: Unauthorized
 *                500:
 *                  description: Internal Server Error
 *
 */

/**
 * @swagger
 *  /courses/{id}:
 *      delete:
 *          tags: [Courses]
 *          summary: Delete Course
 *          description: Delete Course By Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: id for specified course
 *          responses:
 *                200:
 *                  description: Success
 *                404:
 *                  description: NotFound
 *                401:
 *                  description: Unauthorized
 *                500:
 *                  description: Internal Server Error
 *
 */



