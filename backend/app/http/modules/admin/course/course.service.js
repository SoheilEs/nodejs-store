const autoBind = require("auto-bind");
const { courseModel } = require("../../../../models/course");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const {
  deleteFile,
  deleteInvalidPropertyInObject,
} = require("../../../../utils/function");

class CourseService {
  #courseModel;
  constructor() {
    autoBind(this);
    this.#courseModel = courseModel;
  }

  async listCourses(search) {
    if (search) {
      const course = await this.#courseModel.find(
        {
          $text: {
            $search: search,
          },
        },
        { _v: 0 }
      ).populate([
      { path: "category", select:["title"] },
      {
        path: "teacher",
        select: ["mobile", "username", "last_name", "first_name","email "],
      },]);
      return course;
    }
    const course = await this.#courseModel.find({}, { _v: 0 }).populate([
      { path: "category", select:["title"] },
      {
        path: "teacher",
        select: ["mobile", "username", "last_name", "first_name","email "],
      },])
    if (course.length === 0) throw createError.NotFound("محصولی یافت نشد");
    return course;
  }
  async addCourse(data) {
    if (data.price > 0 && data.type === "free")
      throw createError.BadRequest("نمی توان برای دوره رایگان قیمت تعیین کرد");
    const createdCourse = await this.#courseModel.create(data);
    if (!createdCourse._id)
      throw createError.InternalServerError(
        "دروه ایجاد نشد، خطای سرور رخ داده است"
      );
    return createdCourse;
  }
  async addChapter(data) {
    const { id, title, text } = data;
    await this.getCourseById(id);
    const saveChapterRes = await this.#courseModel.updateOne(
      { _id: id },
      {
        $push: {
          chapters: { title, text, episodes: [] },
        },
      }
    );
    if (saveChapterRes.modifiedCount === 0)
      throw createError.InternalServerError("فصل اضافه نشد");
    return "فصل با موفقیت اضافه گردید";
  }
  async chaptersOfCourse(id) {
    if (!isValidObjectId(id))
      throw createError.BadRequest("شناسه معتبر نمی باشد");
    const chapters = await this.#courseModel.findOne(
      { _id: id },
      { chapters: 1, title: 1 }
    );
    if (!chapters) throw createError.NotFound("فصلی یافت نشد");
    return chapters;
  }
  async getCourseById(id) {
    if (!isValidObjectId(id))
      throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");
    const course = await this.#courseModel.findById(id);

    if (!course) throw createError.NotFound("دوره ای یافت نشد");
    return course;
  }
  async updateCourseChapter(chapterId, data) {
    deleteInvalidPropertyInObject(data, ["_id"]);
    const { title, text } = data;

    await this.checkExistChapter(chapterId);
    const updatedChapterRes = await this.#courseModel.updateOne(
      { "chapters._id": chapterId },
      {
        $set: {
          "chapters.$": data,
        },
      }
    );
    if (updatedChapterRes.modifiedCount === 0)
      throw createError.InternalServerError("بروز رسانی فصل انجام نگرفت");
    return "بروزرسانی با موفقیت انجام شد";
  }
  async deleteCourseById(id) {
    if (!isValidObjectId(id))
      throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");
    const course = await this.#courseModel.findById(id);
    if (!course) throw createError.NotFound("دوره ای یافت نشد");
    deleteFile(course.image);
    const deletedCourse = await this.#courseModel.deleteOne({
      _id: course._id,
    });
    if (deletedCourse.deletedCount === 0)
      throw createError.InternalServerError(
        "حذف انجام نگرفت،خطای سرور رخ داده است"
      );
    return "حذف با موفقیت انجام شد";
  }
  async deleteChapterById(chapterId) {
    await this.checkExistChapter(chapterId);
    const deletedChapter = await this.#courseModel.updateOne(
      { "chapters._id": chapterId },
      {
        $pull: {
          chapters: {
            _id: chapterId,
          },
        },
      }
    );

    if (deletedChapter.modifiedCount === 0)
      throw createError.InternalServerError("حذف دوره صورت نگرقت");
    return "فصل با موفقیت حذف گردید";
  }
  async checkExistChapter(chapterId) {

    if (!isValidObjectId(chapterId))
      throw createError.BadRequest("شناسه فصل معتبر نمی باشد");
    const chapter = await this.#courseModel.findOne(
      { "chapters._id": chapterId },
      { "chapters.$": 1 }
    );
    
    if (!chapter) throw createError.NotFound("فصلی برای این دوره ثبت نشده است");
    return chapter;
  }
}

module.exports = new CourseService();
