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
router.get("/chapters/:id",courseController.ListCourseChapters) // :id = _id if a course
router.delete("/:id", courseController.deleteCourse);
router.delete("/chapters/:chapterId",courseController.deleteChapterById) 
router.patch("/chapters/:chapterId",courseController.updataChapterById) 
router.put("/chapters",courseController.addChapter)
router.patch("/:id", courseController.updateCourse);

module.exports = {
  CourseRoutes: router,
};
