const autoBind = require("auto-bind");
const Controller = require("../../controller");
const courseService = require("./course.service");
const { StatusCodes } = require("http-status-codes");
const { deleteFile, copyObject } = require("../../../../utils/function");
const { addCourseSchema } = require("../../../validators/course/course.schema");
const path = require("path");
class CourseController extends Controller {
  #courseServices;
  constructor() {
    super();
    autoBind(this);
    this.#courseServices = courseService;
  }

  async addCourse(req, res, next) {
    try {
      const courseDataBody = await addCourseSchema.validateAsync(req.body);
      req.body.image = path.join(
        courseDataBody.fileUploadPath,
        courseDataBody.filename
      );
      const { title, text, short_text, category, tags, price, discount, type } =
        courseDataBody;
      const image = req.body.image.replace(/\\/g, "/");
      const teacher = req.user._id;
      await this.#courseServices.addCourse({
        title,
        text,
        short_text,
        category,
        tags,
        price,
        discount,
        image,
        teacher,
        type,
      });

      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "دوره با موفقیت ایجاد گردید",
        },
      });
    } catch (error) {
      deleteFile(path.join(req.body.fileUploadPath, req.body.filename));
      next(error);
    }
  }
  async getCourses(req, res, next) {
    try {
      const search = req.query.search;
      const courses = await this.#courseServices.listCourses(search);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          courses,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getSingleCourseById(req, res, next) {
    try {
      const id = req.params.id;
      const course = await this.#courseServices.getCourseById(id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCourse(req, res, next) {
    try {
      const id = req.params.id;
      const course = await this.#courseServices.deleteCourseById(id);

      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateCourse(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CourseController();
