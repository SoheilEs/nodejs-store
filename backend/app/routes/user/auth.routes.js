const authController = require("../../http/controllers/user/auth/auth.controller")
const router = require("express").Router()



/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                  code:
 *                      type: string    
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *                
 *              properties:
 *                  refreshToken:
 *                      type: string
 *           
 */


   

/**
 * @swagger
 * tags:
 *  name: User Authentication 
 *  description: Authentication Routes and Modules
 */



/**
 * @swagger 
 * /user/get-otp:
 *  post:
 *      summary: Login user in userpanel with mobile number
 *      tags : [User Authentication ]
 *      description : one time password(OTP) get
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/GetOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/GetOTP"
 *      responses:
 *            201:
 *             description: Success
 *            400:
 *              description: Bad Request
 *            401:
 *              description: Unauthorized
 *            500:
 *              description: Internal server error
 * 
 */




router.post("/get-otp",authController.getOtp)
/**
 * @swagger 
 * /user/check-otp:
 *  post:
 *      summary: Check OTP
 *      tags : [User Authentication]
 *      description : one time password(OTP) Check
 *      requestBody:
 *          content: 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOTP"
 *      responses:
 *            201:
 *             description: Success
 *            400:
 *              description: Bad Request
 *            401:
 *              description: Unauthorized
 *            500:
 *              description: Internal server error
 * 
 */
router.post("/check-otp",authController.checkOtp)



/**
 * @swagger 
 * /user/refresh-token:
 *  post:
 *      summary: Send Refresh Token for get new accessToken and refreshToken
 *      tags : [User Authentication]
 *      description : New Token
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/RefreshToken"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/RefreshToken"
 *              
 *      responses:
 *            200:
 *             description: Success
 *            400:
 *              description: Bad Request
 *            401:
 *              description: Unauthorized
 *            500:
 *              description: Internal server error
 * 
 */
router.post("/refresh-token",authController.sendRefreshToken)
module.exports={
    UserAuthRoutes: router
}
