const { VerifyAccessToken } = require("../../../http/middlewares/verifyAccessToken")
const paymentGetwayController = require("../../../http/modules/api/paymentGetway/paymentGetway.controller")

const router = require("express").Router()



router.post("/",VerifyAccessToken,paymentGetwayController.paymentGetway)
router.get("/verify",paymentGetwayController.paymentGetwaVerify)  


module.exports = {
    PaymentRoutes : router
}