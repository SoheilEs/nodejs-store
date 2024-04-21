const roleController = require("../../http/modules/admin/RBAC/role.controller")
const { stringToArray } = require("../../http/middlewares/stringToArray");
const router = require("express").Router()


router.post("/",stringToArray("permissions"),roleController.addRole)
router.get("/",roleController.getRoles)
router.delete("/:field",roleController.deleteRoleById)
router.patch("/:id",stringToArray("permissions"),roleController.editRoleById)


module.exports = {
    RoleRoutes: router
}