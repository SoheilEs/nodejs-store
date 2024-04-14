const authController = require("../../http/modules/admin/user/auth/auth.controller");
const router = require("express").Router();

router.post("/get-otp", authController.getOtp);

router.post("/check-otp", authController.checkOtp);

router.post("/refresh-token", authController.sendRefreshToken);
module.exports = {
  UserAuthRoutes: router,
};
