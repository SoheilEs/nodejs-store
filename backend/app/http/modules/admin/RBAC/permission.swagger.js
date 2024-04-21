/**
 * @swagger
 *  tags:
 *      name: Permissions
 *      summary: Permissions modules and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          addPermission:
 *              type: object
 *              required: 
 *                        title
 *                        description
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *          editPermission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  
 */



/**
 * @swagger
 *  /permissions :
 *      get:
 *          tags: [Permissions]
 *          summary: Get Permissions
 *          description: Get List of Permissions
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
 *  /permissions :
 *      post:
 *          tags: [Permissions]
 *          summary: Add Permission
 *          description: Add Permission 
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/addPermission"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/addPermission"
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
 *  /permissions/{id} :
 *      patch:
 *          tags: [Permissions]
 *          summary: Edit Permission
 *          description: Edit Permission
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
 *                          $ref: "#/components/schemas/editPermission"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/editPermission"
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
 *  /permissions/{id} :
 *      delete:
 *          tags: [Permissions]
 *          summary: Delete Permissions
 *          description: Delet Permissions by Id
 *          parameters:
 *               -  in: path
 *                  name: id
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