const blogController = require("../../http/modules/admin/blog/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.post(
  "/",
  uploadFile.single("image"),
  stringToArray("tags"),
  blogController.createBlog
);
router.get("/", blogController.ListAllBlogs);

router.get("/:id", blogController.getSingelBlog);

router.delete("/:id", blogController.deleteBlogById);

router.patch(
  "/:id",
  uploadFile.single("image"),
  stringToArray("tags"),
  blogController.updateBlogById
);

module.exports = {
  BlogRoutes: router,
};
