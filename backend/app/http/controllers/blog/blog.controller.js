const autoBind = require("auto-bind");
const Controller = require("../controller");
const blogService = require("./blog.service");
const { createBlogSchema } = require("../../validators/blog/blog.schema");
const path = require("path");
const { deleteFile } = require("../../../utils/function");

class BlogController extends Controller {
  #service;
  constructor() {
    super();
    autoBind(this);
    this.#service = blogService;
  }
  async createBlog(req, res, next) {
    try {
      const { _id: author } = req.user;
      const blogDataBody = await createBlogSchema.validateAsync(req.body);
      req.body.image = path.join(
        blogDataBody.fileUploadPath,
        blogDataBody.filename
      );
      const { title, text, short_text, category, tags } = blogDataBody;
      const image = req.body.image;
      await this.#service.createBlog({
        author,
        title,
        image,
        text,
        short_text,
        category,
        tags,
      });
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "ایجاد بلاگ با موفقیت انجام گرفت",
        },
      });
    } catch (error) {
      deleteFile(req?.body?.image);
      next(error);
    }
  }
  async getSingelBlog(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.#service.getSingleBlog(id);
      return res.status(200).json({
        data: {
          statusCode: 200,
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async ListAllBlogs(req, res, next) {
    try {
      const blogs = await this.#service.getAllBlogs();
      return res.status(200).json({
        data: {
          statusCode: 200,
          blogs,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCommentsOfBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async deleteBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.#service.deleteBlogById(id);
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const { _id: author } = req.user;
      console.log(author);

      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
      }

      const data = req.body;
      const result = await this.#service.updateBlog(author,id, data);
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: result,
        },
      });
    } catch (error) {
      deleteFile(req?.body?.image);
      next(error);
    }
  }
}

module.exports = new BlogController();
