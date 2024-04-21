const permissionController = require("../../http/modules/admin/RBAC/permission.controller")

const router = require("express").Router()


router.get("/",permissionController.getPermissions)
router.post("/",permissionController.addPermissions)
router.patch("/:id",permissionController.editPermissions)
router.delete("/:id",permissionController.deletePermissions)

module.exports = {
    PermissionRoutes: router
}