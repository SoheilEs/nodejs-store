/**
 * @swagger
 * tags:
 *  name: Api for Developer
 *  description: Developer Routes and Modules
 */

/**
 * @swagger
 * /dev/password-hash/{password}:
 *  get:
 *      summary: Password Hash Generator
 *      tags: [Api for Developer]
 *      description: Get password from params and Generate hash of it
 *      parameters:
 *      -   name: password
 *          type: string
 *          required: true
 *          in: path
 *
 *      responses:
 *              200:
 *                  description: Success
 *
 */

/**
 * @swagger
 * /dev/random-number:
 *  get:
 *      summary: Random Number Generator
 *      tags: [Api for Developer]
 *      description: Get random number
 *
 *      responses:
 *              200:
 *                  description: Success
 *
 */