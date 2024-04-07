const router = require("express").Router();
const bcrypt = require("bcrypt");
const { randomNumberGen } = require("../../utils/function");
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

router.get("/password-hash/:password", (req, res) => {
  const salt = bcrypt.genSaltSync(12);
  const { password } = req.params;
  return res.send(bcrypt.hashSync(password, salt));
});

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

router.get("/random-number", (req, res) => {
  return res.send(randomNumberGen().toString());
});

module.exports = {
  DeveloperRoutes: router,
};
