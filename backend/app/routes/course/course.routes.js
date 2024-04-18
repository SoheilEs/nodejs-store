const courseController = require("../../http/modules/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile, videoUpload } = require("../../utils/multer");

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

router.patch("/:id",uploadFile.single("image") ,courseController.updateCourse);
router.get("/chapters/:id",courseController.ListCourseChapters) // :id = _id if a course
router.delete("/chapters/:chapterId",courseController.deleteChapterById) 
router.patch("/chapters/:chapterId",courseController.updataChapterById) 
router.put("/chapters",courseController.addChapter)
router.post("/episodes/add",videoUpload.single("video"),courseController.episodeAdd)
router.delete("/episodes/:episodeID",courseController.episodeDelete)
router.patch("/episodes/:episodeID",videoUpload.single("video"),courseController.episodeUpdate)

module.exports = {
  CourseRoutes: router,
};
