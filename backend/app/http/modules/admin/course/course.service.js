const autoBind = require("auto-bind");
const { courseModel } = require("../../../../models/course");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const { deleteFile } = require("../../../../utils/function");

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
      );
      return course;
    }
    const course = await this.#courseModel.find({}, { _v: 0 });
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
  async getCourseById(id) {
    if (!isValidObjectId(id))
      throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");
    const course = await this.#courseModel.findById(id);

    if (!course) throw createError.NotFound("دوره ای یافت نشد");
    return course;
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
}

module.exports = new CourseService();
