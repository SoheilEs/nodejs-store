/**
 * @swagger
 *  tags:
 *      name: Users
 *      description: User module and routes
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          updateUser:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *                  username:
 *                      type: string
 *                  email:
 *                      type: string
 *              
 */

/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  first_name:
 *                                      type: string
 *                                      example: "user first_name"
 *                                  last_name:
 *                                      type: string
 *                                      example: "user last_name"
 *                                  username:
 *                                      type: string
 *                                      example: "username"
 *                                  email:
 *                                      type: string
 *                                      example: "the_user_email@example.com"
 *                                  mobile:
 *                                      type: string
 *                                      example: "09332255768"
 */


/**
 * @swagger
 *  /users/:
 *      get:
 *          tags: [Users]
 *          summmary: Get List of All users
 *          descrption: Get Users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in user first_name, last_name, username, mobile, email
 *          responses :
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfUsers'
 */

/**
 * @swagger
 *  /users/:
 *      patch:
 *          tags: [Users]
 *          summary: Edit user information
 *          description: Update User
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/updateUser"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/updateUser"
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: NotFound
 *              500: 
 *                  description: Internal Server Error
 *    
 */

/**
 * @swagger
 *  /users/profile:
 *      get:
 *          tags: [Users]
 *          summary: Get user 
 *          description: Get user Profile
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: NotFound
 *              500:
 *                  description: Internal Server Error
 *              
 *          
 *   
 */