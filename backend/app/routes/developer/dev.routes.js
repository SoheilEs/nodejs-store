const router = require("express").Router();
const bcrypt = require("bcrypt");
const { randomNumberGen } = require("../../utils/function");

router.get("/password-hash/:password", (req, res) => {
  const salt = bcrypt.genSaltSync(12);
  const { password } = req.params;
  return res.send(bcrypt.hashSync(password, salt));
});



router.get("/random-number", (req, res) => {
  return res.send(randomNumberGen().toString());
});

module.exports = {
  DeveloperRoutes: router,
};
