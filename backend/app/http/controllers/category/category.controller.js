const autoBind = require("auto-bind");
const Controller = require("../controller");
const categoryService = require("./category.service");
const { categorySchema } = require("../../validators/category/category.shema");
const { json } = require("express");

module.exports = new (class CategoryController extends Controller {
  #service;
  constructor() {
    super();
    autoBind(this);
    this.#service = categoryService;
  }

  async createCategory(req, res, next) {
    try {
      await categorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await this.#service.createCategory(title, parent);
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "دسته بندی با موفقیت ایجاد گردید",
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const result = await this.#service.editCategory(id, title);
      res.status(200).json({
        data: {
          statusCode: 200,
          message: result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.#service.removeCategory(id);
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
  async listAllCategory(req, res, next) {
    try {
      const result = await this.#service.getAllCategories();
      return res.status(200).json({
        data: {
          statusCode: 200,
          categories: result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getAllParents(req, res, next) {
    try {
      const result = await this.#service.getAllParents();
      return res.status(200).json({
        data: {
          statusCode: 200,
          parents: result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getChildOfParents(req, res, next) {
    try {
      const { parentId } = req.params;
      const result = await this.#service.getChildOfParents(parentId);
      return res.status(200).json({
        data: {
          statusCode: 200,
          childrens: result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
})();
