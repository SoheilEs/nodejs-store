/**
 * @swagger
 *  tags:
 *      name: Roles
 *      summary: Roles modules and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *       
 *          addRole:
 *              type: object
 *              required: 
 *                      title
 *                      description
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  permissions:
 *                      type: array
 *                      items: 
 *                          type: string
 *          editRole:
 *              type: object
 *              
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  permissions:
 *                      type: array
 *                      items: 
 *                          type: string
 *                  
 */



/**
 * @swagger
 *  /roles :
 *      get:
 *          tags: [Roles]
 *          summary: Get Roles
 *          description: Get List of Roles
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: NotFound
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /roles :
 *      post:
 *          tags: [Roles]
 *          summary: Add Role
 *          description: Add Role 
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/addRole"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/addRole"
 *          responses:
 *              201:
 *                  description: Created
 *              404:
 *                  description: NotFound
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /roles/{id} :
 *      patch:
 *          tags: [Roles]
 *          summary: Edit Role
 *          description: Edit Role 
 *          parameters:
 *               -  in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *         
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/editRole"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/editRole"
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: NotFound
 *              500:
 *                  description: Internal Server Error
 */


/**
 * @swagger
 *  /roles/{field} :
 *      delete:
 *          tags: [Roles]
 *          summary: Delete Role
 *          description: Delet Role by Id
 *          parameters:
 *               -  in: path
 *                  name: field
 *                  required: true
 *                  type: string
 *         
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: NotFound
 *              500:
 *                  description: Internal Server Error
 */