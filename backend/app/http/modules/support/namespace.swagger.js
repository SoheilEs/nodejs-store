/**
 * @swagger
 *  components:
 *      schemas:
 *          Namespace:
 *              type: object
 *              required:
 *                  -   title
 *                  -   endpoint
 *              properties:
 *                  title:
 *                      type: string
 *                  endpoint:
 *                      type:
 *                            string
 * 
 */


/**
 * @swagger
 *  /support/namespace/add:
 *      post:
 *          tags: [Support]
 *          summary: create namespace for chatroom
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Namespace"
 *          responses:
 *              201:
 *                  description: Success
 *              404:
 *                  description: NotFound
 *              500: 
 *                  description: Interal Server Error
 */

/**
 * @swagger
 *  /support/namespace/list:
 *      get:
 *          tags: [Support]
 *          summary: Get List of namespaces
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: NotFound
 *              500: 
 *                  description: Interal Server Error
 */