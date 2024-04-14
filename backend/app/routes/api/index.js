const router = require("express").Router();
const homePageController = require("../../http/modules/api/homePage.controller");
const {
  VerifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: Index page routes
 */
/**
 * @swagger
 *
 * /:
 *  get:
 *      summary: index page routes
 *      tags: [IndexPage]
 *      description: get all need data for index page
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          exampel : Bearer Your token...
 *
 *      responses:
 *            200:
 *             description: succcess
 *            404:
 *             description: notfound
 *
 *
 */

router.get("/", VerifyAccessToken, homePageController.indexPage);

module.exports = {
  HomePageRoutes: router,
};
