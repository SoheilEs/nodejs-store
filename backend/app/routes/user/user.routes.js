const { checkPermission } = require("../../http/middlewares/permission.guard")
const userController = require("../../http/modules/admin/user/user.controller")
const { PERMISSIONS } = require("../../utils/constans")

const router = require("express").Router()


router.get("/",checkPermission([PERMISSIONS.ADMIN]),userController.getUsers)
router.patch("/",userController.editUser)
router.get("/profile",checkPermission([]),userController.getProfile)


module.exports = {
    UserRoutes: router
}