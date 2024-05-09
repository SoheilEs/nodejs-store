/**
 * @swagger 
 *  components:
 *      schemas:
 *          addRoom:
 *              type: object
 *              required: 
 *                  -   name
 *                  -   description
 *                  -   namespace
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Name of room
 *                  description:
 *                      type: string
 *                      description: Description for room
 *                  image:
 *                      type: file
 *                  namespace:
 *                      type: string
 *                      description: Endpoint of namespace
 *                  
 * 
 */

/**
 * @swagger
 *  /support/room/add:
 *      post:
 *          tags: [Support]
 *          description: Add room for a namespace
 *          summary: Add room
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/addRoom"
 *          responses:
 *              201:
 *                description: Created
 *              404: 
 *                description: NotFound
 *              500:
 *                 description: Internal Server Error
 *              
 *  
 */

/**
 * @swagger
 *  /support/room/list:
 *      get:
 *          tags: [Support]
 *          description: List rooms for a namespace
 *          summary: List room
 *     
 *          responses:
 *              200:
 *                description: Success
 *              404: 
 *                description: NotFound
 *              500:
 *                 description: Internal Server Error
 *              
 *  
 */