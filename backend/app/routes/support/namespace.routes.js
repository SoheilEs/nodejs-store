const namespaceController = require("../../http/modules/support/namespace.controller")

const router = require("express").Router()


router.post("/add",namespaceController.addNamespace)
router.get("/list",namespaceController.getListOfNamespace)


module.exports = {
    NamespaceRoutes : router
}