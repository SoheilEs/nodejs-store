const autoBind = require("auto-bind");
const { blogModel } = require("../../../models/blogs");
const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");
const { deleteFile } = require("../../../utils/function");

class BlogService {
  #BlogModel;
  constructor() {
    autoBind(this);
    this.#BlogModel = blogModel;
  }

  async createBlog(data) {
    const blog = await this.#BlogModel.create(data);
    return blog;
  }
  async getAllBlogs() {
    return await this.#BlogModel.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "author",
          as: "author",
        },
      },
      {
        $lookup: {
          from: "categories",
          foreignField: "_id",
          localField: "category",
          as: "category",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $unwind: "$category",
      },

      {
        $project: {
          "author.role": 0,
          "author.otp": 0,
          "author.__v": 0,
          "author.bills": 0,
          "author.discount": 0,
        },
      },
    ]);
  }
  async getSingleBlog(id) {
    if (!isValidObjectId(id))
      throw createError.NotFound("شناسه بلاگ نامعتبر است");
    const blog = await this.checkExsistBlog(id);
    if (!blog) throw createError.NotFound("بلاگ یافت نشد");
    return blog;
  }
  async deleteBlogById(id) {
    if (!isValidObjectId(id))
      throw createError.NotFound("شناسه بلاگ نامعتبر است");
    const blog = await this.checkExsistBlog(id);
    if (!blog?._id) throw createError.NotFound("بلاگ یافت نشد");
    deleteFile(blog.image);
    const deleteResult = await this.#BlogModel.deleteOne({ _id: blog._id });
    if (deleteResult.deletedCount === 0)
      throw createError.InternalServerError("حذف بلاگ انجام نشد");
    return "بلاگ با موفقیت حذف گردید";
  }
  async updateBlog(author,id, data) {

    let nullishData = ["", " ", null, undefined, NaN, 0, "0"];
    let blackListFields = ["bookmarks","dislikes","commments","likes","author"]
    Object.keys(data).forEach((key) => {
      if(blackListFields.includes(key)) delete data[key]
      if (typeof data[key] === "string") data[key] = data[key].trim();
      if (Array.isArray(data[key]) && Array.length > 0)
        data[key] = data[key].map((item) => item.trim());
      if (nullishData.includes(data[key])) delete data[key];
    });
    if (!isValidObjectId(id))
      throw createError.NotFound("شناسه بلاگ نامعتبر است");
    const blog = await this.checkExsistBlog(id);
    if(blog.author !== author) throw createError.Unauthorized("شما مجاز به انجام این کار نیستید")
    if (!blog?._id) throw createError.NotFound("بلاگ یافت نشد");
    const updateBlog = await this.#BlogModel.updateOne(
      { _id: blog._id },
      { $set: data  }
    );
    if (updateBlog.modifiedCount === 0)
      throw createError.InternalServerError("بروز رسانی صورت نگرفت");
    return "بروز رسانی با موفقیت انجام گردید";
  }
  async checkExsistBlog(id) {
    return await this.#BlogModel.findById(id).populate([
      { path: "category" },
      {
        path: "author",
        select: ["mobile", "username", "last_name", "first_name"],
      },
    ]);
  }
}

module.exports = new BlogService();
