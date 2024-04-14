/**
 * @swagger
 *  tags:
 *      name: Product
 *      description: Products Modules and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   category
 *                  -   price
 *                  -   count
 *                  -   discount
 *                  -   type
 *
 *              properties:
 *                  title:
 *                      type: string
 *                  short_text:
 *                      type: string
 *                  text:
 *                      type: string
 *                  category:
 *                      type: string
 *                  price:
 *                      type: number
 *                  discount:
 *                      type: number
 *                  count:
 *                      type: number
 *                  images:
 *                      type: array
 *                      items:
 *                        type: string
 *                        format: binary
 *                  tags:
 *                      type: array
 *                  height:
 *                      type: number
 *                  width:
 *                      type: number
 *                  weight:
 *                      type: number
 *                  length:
 *                      type: number
 *                  colors:
 *                      type: array
 *                      items:
 *                        type: string
 *                  type:
 *                      type: string
 *                      enum: [virtual,physical]
 *
 *
 *
 *          EditProduct:
 *                type: object
 *                properties:
 *                  title:
 *                      type: string
 *                  short_text:
 *                      type: string
 *                  text:
 *                      type: string
 *                  category:
 *                      type: string
 *                  price:
 *                      type: number
 *                  discount:
 *                      type: number
 *                  count:
 *                      type: number
 *                  images:
 *                      type: array
 *                      items:
 *                        type: string
 *                        format: binary
 *                  tags:
 *                      type: array
 *                  height:
 *                      type: number
 *                  width:
 *                      type: number
 *                  weight:
 *                      type: number
 *                  length:
 *                      type: number
 *                  colors:
 *                      type: array
 *                      items:
 *                        type: string
 *                  type:
 *                      type: string
 *                      enum: [virtual,physical]
 *
 *
 *
 *
 *
 *
 */

/**
 * @swagger
 *  /product:
 *    post:
 *        summary: Add Product
 *        description: Add new Product
 *        tags: [Product]
 *        requestBody:
 *            required: true
 *            content:
 *                multipart/form-data:
 *                    schema:
 *                        $ref: "#/components/schemas/Product"
 *        responses:
 *            201:
 *                description: Created
 *
 */


/**
 * @swagger
 *  /product:
 *    get:
 *        tags: [Product]
 *        summary: Get Products
 *        description: Lis All Added Products
 *        parameters:
 *            -   in: query
 *                name: search
 *                type: string
 *                description: text for search in title, text, short_text
 *        responses:
 *            200:
 *              description: Success
 *            404:
 *              description: NotFound
 */



/**
 * @swagger
 *  /product/{id}:
 *    get:
 *        tags: [Product]
 *        summary: Get Singel Product
 *        description: Get Product By ID
 *        parameters:
 *          -     in: path
 *                name: id
 *                required: true
 *                type: string
 *        responses:
 *            200:
 *              description: Success
 *            404:
 *              description: NotFound
 */


/**
 * @swagger
 *  /product/{id}:
 *    delete:
 *        tags: [Product]
 *        summary: Delete Product
 *        description: Delete Product By ID
 *        parameters:
 *          -     in: path
 *                name: id
 *                required: true
 *                type: string
 *        responses:
 *            200:
 *              description: Success
 *            404:
 *              description: NotFound
 */


/**
 * @swagger
 *  /product/{id}:
 *    patch:
 *        tags: [Product]
 *        summary: Edit Product
 *        description: Edit Product Fields
 *        parameters:
 *            -   in: path
 *                name: id
 *                type: string
 *                required: true
 *        requestBody:
 *            content:
 *                 multipart/form-data:
 *                     schema:
 *                        $ref: "#/components/schemas/EditProduct"
 *        responses:
 *            200:
 *              description: Sucess
 *            404:
 *              description: NotFound
 *            401:
 *              description: Unauthorized
 *            500:
 *              description: Internal Server Error
 */
