const autoBind = require("auto-bind");
const { courseModel } = require("../../../../models/course");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const {
  deleteFile,
  deleteInvalidPropertyInObject,
  copyObject,
} = require("../../../../utils/function");

class CourseService {
  #courseModel;
  constructor() {
    autoBind(this);
    this.#courseModel = courseModel;
  }

  async listCourses(search) {
    if (search) {
      const course = await this.#courseModel
        .find(
          {
            $text: {
              $search: search,
            },
          },
          { _v: 0 }
        )
        .populate([
          { path: "category", select: ["title"] },
          {
            path: "teacher",
            select: ["mobile", "username", "last_name", "first_name", "email "],
          },
        ]);
      return course;
    }
    const course = await this.#courseModel.find({}, { _v: 0 }).populate([
      { path: "category", select: ["title"] },
      {
        path: "teacher",
        select: ["mobile", "username", "last_name", "first_name", "email "],
      },
    ]);
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

  async createEpisode(data) {
    const { title, text, type, time, videoAddress, courseID, chapterID } = data;
    const episode = { title, text, type, time, videoAddress };
    const createdEpisode = await this.#courseModel.updateOne(
      { _id: courseID, "chapters._id": chapterID },
      {
        $push: {
          "chapters.$.episodes": episode,
        },
      }
    );
    if (createdEpisode.modifiedCount === 0)
      throw createError.InternalServerError("قسمت اضافه نگردید");
    return "قسمت با موفقیت اضافه گردید";
  }


  async deleteEpisode(id) {
    if (!isValidObjectId(id))
      throw createError.BadRequest("شناسه قسمت صحیح نمی باشد");

    await this.getOneEpisode(id)

    const deleteResult = await this.#courseModel.updateOne(
      {
        "chapters.episodes._id": id,
      },
      {
        $pull: {
          "chapters.$.episodes": {
            _id: id,
          },
        },
      }
    );
    if (deleteResult.modifiedCount === 0)
      throw createError.InternalServerError("حذف قسمت انجام نگرفت");
   
    return "حذف قسمت با موفقیت انجام شد";
  }

  async editEpisode(id,data){
    
    if(!isValidObjectId(id)) throw createError.BadRequest("شناسه معتبر نمی باشد")
    const ep= await this.getOneEpisode(id)
    const newEpisode = {
      ...ep,
      ...data
    }
    console.log(newEpisode);
    const editResult = await this.#courseModel.updateOne(
  {
      "chapters.episodes._id": id 
  },
  {
    $set:{
      "chapters.$.episodes": newEpisode
    }
  })
  
  if(editResult.modifiedCount === 0) throw createError.InternalServerError("بروز رسانی قسمت انجام نشد")
  return "بروز رسانی با موفقیت انجام گرفت"
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
    )

    if (!chapter) throw createError.NotFound("فصلی برای این دوره ثبت نشده است");
    console.log(chapter);
    return chapter;
  }

  async getOneEpisode(episodeID){
    const course = await this.#courseModel.findOne({"chapters.episodes._id":episodeID},{
      "chapters.episodes.$": 1
    })
    console.log(episodeID,course);
    if(!course) throw createError.NotFound("قسمتی یافت نشد")
    
    const episode = await course?.chapters[0]?.episodes[0]
    return copyObject(episode)
  }
 
}

module.exports = new CourseService();
