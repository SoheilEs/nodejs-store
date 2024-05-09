const roomController = require("../../http/modules/support/room.controller")
const { uploadFile } = require("../../utils/multer")


const router = require("express").Router()


router.post("/add",uploadFile.single("image"),roomController.addRooms)
router.get("/list",roomController.getListOfRooms)


module.exports = {
    RoomRoutes : router
}