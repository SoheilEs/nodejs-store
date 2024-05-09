const supportController = require("../../http/modules/support/support.controller")
const { NamespaceRoutes } = require("./namespace.routes")
const { RoomRoutes } = require("./rooms.routes")
const router = require("express").Router()

router.get("/", supportController.renderChatRoom)
router.use("/namespace",NamespaceRoutes)
router.use("/room",RoomRoutes)

module.exports = {
    SupportRouts: router
}