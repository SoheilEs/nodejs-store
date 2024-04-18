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
 *          
 *          updateCourse:
 *              type: object
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
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                     type: string
 *                  title:
 *                      type: string
 *                  text:
 *                      type: string
 * 
 *          UpdateChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  text:
 *                      type: string
 *          UpdateEpisode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  text:
 *                      type: string
 *                  video:
 *                      type: file
 *                      description: file of episode 
 *                  type:
 *                     type: string
 *                     enum: [unlock,lock]
 *                     description: Default is Unlock
 *                      
 *                  
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   video
 *                  -   type
 *              properties:
 *                  courseID:
 *                     type: string
 *                  chapterID:
 *                      type: string
 *                  title:
 *                      type: string
 *                  text:
 *                      type: string
 *                  type:
 *                     type: string
 *                     enum: [unlock,lock]
 *                     description: Default is Unlock
 * 
 *                  video:
 *                      type: file
 *                      description: file of episode 
 *                      
 *                      
 * 
 *                          
 *                      
 *
 *
 */

/**
 * @swagger
 *  definitions:
 *      
 *      ChaptersOfCourse:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: "sjd242343213ewf"
 *                              title:
 *                                  type: string
 *                                  example: title of a course
 *                              chapters:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                              _id: 
 *                                                  type: string
 *                                              title: 
 *                                                  type: string
 *                                              text:
 *                                                  type: string
 *                                              episodes:
 *                                                  type: array
 *                                                  example: []
 *                              
 *                              
 *      ListoFCourses:
 *          type: object
 *          properties:
 *              statusCode: 
 *                   type: integer
 *                   example: 200
 *              data:
 *                   type: object
 *                   properties:
 *                      courses:
 *                             type: array
 *                             items: 
 *                                  type: object
 *                                  properties:
 *                                        _id:
 *                                           type: string
 *                                           example: adsdf23423423324
 *                                        title:
 *                                              type: string
 *                                              example: title for course
 *                                        short_text:
 *                                              type: string
 *                                              example: title for course
 *                                        text:
 *                                             type: string
 *                                             example: title for course
 *                                        status:
 *                                              type: string
 *                                              example: [free, cash, vip]
 *                                        time:
 *                                              type: string
 *                                              example: "01:30:33"
 *                                        teacher:
 *                                              type: string
 *                                              example: Soheil
 *                                        price:
 *                                              type: number
 *                                              example: 250000
 *                                        discount:
 *                                              type: number
 *                                              example: 20
 * 
 *                                        studentCount:
 *                                              type: integer
 *                                              example: 200
 *                                              
 *                                      
 *                                         
 *              
 *
 *  
 *      publicDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 20X
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: "the best message for that action"
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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
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
 *      patch:
 *          tags: [Courses]
 *          summary: Edit Course
 *          description: Edit Course By Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: id for specified course
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/updateCourse"
 *          responses:
 *                200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
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
 *  /courses/chapters :
 *      put:
 *          tags: [Courses]
 *          description: Add Chapter for a Course
 *          summary: Add chapter
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/AddChapter"
 *                  application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/AddChapter"
 *          responses:
 *              201:
 *                  description: Created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 *              404:
 *                  description: NotFound
 *              500:
 *                  description: Internal Server Error
 */


/**
 * @swagger
 *  /courses/chapters/{id}:
 *      get:
 *          tags: [Courses]
 *          summary: get Chapters 
 *          description: Get chapters of a Course by id
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  type: string
 *                  name: id
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/ChaptersOfCourse"
 *              404: 
 *                  description: NotFound
 *              500:
 *                  description: Internal Server Error
 */



/**
 * @swagger
 *  /courses/chapters/{chapterId}:
 *      delete:
 *          tags: [Courses]
 *          summary: delete Chapter
 *          description: delete chapter of a Course by chapterId
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  type: string
 *                  name: chapterId
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 *              404: 
 *                  description: NotFound
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /courses/chapters/{chapterId}:
 *      patch:
 *          tags: [Courses]
 *          summary: Update Chapter
 *          description: Update chapter of a Course by chapterId
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  type: string
 *                  name: chapterId
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateChapter"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateChapter"
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 *              404: 
 *                  description: NotFound
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /courses/episodes/add:
 *      post:
 *          tags: [Courses]
 *          summmary: Add Episode
 *          description: Add Episode to a chapter
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/AddEpisode"
 *                  
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
 *  /courses/episodes/{episodeID}:
 *      delete:
 *          tags: [Courses]
 *          summmary: Delete Episode
 *          description: Delete Episode of a chapter
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  required: true
 *                  example: 661ec74ee7aee1c008c0e784
 *                  description: Id of a episode for removing
 *                  
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
*  /courses/episodes/{episodeID}:
*      patch:
*          tags: [Courses]
*          summary: Update Episode
*          description: Update Episode of a chapter by episodeId
*          parameters:
*              -   in: path
*                  required: true
*                  type: string
*                  name: episodeID
*          requestBody:
*              content:
*                  multipart/form-data:
*                      schema:
*                          $ref: "#/components/schemas/UpdateEpisode"
*                  application/json:
*                      schema:
*                          $ref: "#/components/schemas/UpdateEpisode"
*          responses:
*              200:
*                  description: Success
*                  content:
*                      application/json:
*                          schema:
*                              $ref: "#/definitions/publicDefinition"
*              404: 
*                  description: NotFound
*              500:
*                  description: Internal Server Error
*/
