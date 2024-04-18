const autoBind = require("auto-bind");
const Controller = require("../../controller");
const courseService = require("./course.service");
const { StatusCodes } = require("http-status-codes");
const { deleteFile, getTime, deleteInvalidPropertyInObject } = require("../../../../utils/function");
const {
  addCourseSchema,
  episodeAddSchema,
} = require("../../../validators/course/course.schema");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const { getVideoDurationInSeconds } = require("get-video-duration");
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
  async addChapter(req, res, next) {
    try {
      const { id, title, text } = req.body;
      const result = await this.#courseServices.addChapter({ id, title, text });
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async ListCourseChapters(req, res, next) {
    try {
      const id = req.params.id;
      const chapters = await this.#courseServices.chaptersOfCourse(id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          course: chapters,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteChapterById(req, res, next) {
    try {
      const chapterId = req.params.chapterId;
      const result = await this.#courseServices.deleteChapterById(chapterId);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updataChapterById(req, res, next) {
    try {
      const chapterId = req.params.chapterId;
      const result = await this.#courseServices.updateCourseChapter(
        chapterId,
        req.body
      );
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: result,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async episodeAdd(req, res, next) {
    try {
      const {
        title,
        text,
        chapterID,
        courseID,
        type,
        filename,
        fileUploadPath,
      } = await episodeAddSchema.validateAsync(req.body);
      const videoAddress = path.join(fileUploadPath, filename);
      const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
      const seconds = await getVideoDurationInSeconds(videoURL);
      const time = getTime(seconds);
      const result = await this.#courseServices.createEpisode({
        title,
        time,
        type,
        videoAddress,
        chapterID,
        courseID,
        text,
      });
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: result,
        },
      });
    } catch (error) {
      const { fileUploadPath, filename } = req.body;
      deleteFile(path.join(fileUploadPath, filename));
      next(error);
    }
  }
  async episodeDelete(req, res, next) {
    try {
      const id = req.params.episodeID;
      const result = await this.#courseServices.deleteEpisode(id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async episodeUpdate(req, res, next) {
    try {
      const id = req.params.episodeID;
      const {filename, fileUploadPath} = req.body
      let blackListFields = ["_id"]
      if(filename && fileUploadPath){
        req.body.videoAddress = path.join(fileUploadPath, filename);
        const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
        const seconds = await getVideoDurationInSeconds(videoURL);
        req.body.time = getTime(seconds);
        blackListFields.push("filename")
        blackListFields.push("fileUplaodPath")
      }else{
        blackListFields.push("time")
        blackListFields.push("videoAddress")
      }
      const data = req.body
      deleteInvalidPropertyInObject(data,blackListFields)
      const result = await this.#courseServices.editEpisode(id,data);
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message : result
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async episodeGet(req, res, next) {
    try {
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {},
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CourseController();
