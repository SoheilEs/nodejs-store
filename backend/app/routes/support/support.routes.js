const { CheckLogin, CheckAcessLogin } = require("../../http/middlewares/auth")
const supportController = require("../../http/modules/support/support.controller")
const { NamespaceRoutes } = require("./namespace.routes")
const { RoomRoutes } = require("./rooms.routes")
const router = require("express").Router()

router.get("/",CheckLogin,supportController.renderChatRoom)
router.use("/namespace",NamespaceRoutes)
router.use("/room",RoomRoutes)
router.get("/login",CheckAcessLogin,supportController.loginForm)
router.post("/login",CheckAcessLogin,supportController.login)

module.exports = {
    SupportRouts: router
}