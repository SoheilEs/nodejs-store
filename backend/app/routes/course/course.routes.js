const courseController = require("../../http/modules/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post(
  "/",
  uploadFile.single("image"),
  stringToArray("tags"),
  courseController.addCourse
);

router.get("/", courseController.getCourses);

router.get("/:id", courseController.getSingleCourseById);

router.delete("/:id", courseController.deleteCourse);
router.patch("/:id", courseController.updateCourse);

module.exports = {
  CourseRoutes: router,
};
