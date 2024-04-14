const autoBind = require("auto-bind");
const { categoryModel } = require("../../../../models/categories");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");

module.exports = new (class CategoryService {
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#categoryModel = categoryModel;
  }

  async createCategory(title, parent) {
    const category = await this.#categoryModel.create({ title, parent });
    if (!category)
      throw createError.InternalServerError("خطای سرور رخ داده است");
    return category;
  }
  async getAllParents() {
    const parents = await this.#categoryModel.aggregate([
      {
        $match: { parent: undefined },
      },
    ]);
    if (!parents) throw createError.NotFound("دسته ای یافت نشد");
    return parents;
  }
  async getChildOfParents(parentId) {
    if (!isValidObjectId(parentId))
      throw createError.NotFound("شناسه وارد شده معتبر نیست");
    const childrens = await this.#categoryModel.find(
      { parent: parentId },
      { __v: 0, parent: 0 }
    );
    if (!childrens) throw createError.NotFound("زیردسته ای وجود ندارد");
    return childrens;
  }
  async getAllCategories() {
    return await this.#categoryModel.find({ parent: undefined });
  }
  async removeCategory(id) {
    const category = await this.checkExistCategory(id);
    const deleteResult = await this.#categoryModel.deleteMany({
      $or: [{ _id: category._id }, { parent: category._id }],
    });
    if (deleteResult.deletedCount === 0)
      throw createError.InternalServerError("حذف دسته بندی انجام نشد");
    return "حذف دسته بندی با موفقیت انجام شد";
  }
  async editCategory(id, title) {
    if (!isValidObjectId(id))
      throw createError.NotFound("شناسه وارد شده معتبر نیست");
    const editedCategory = await this.#categoryModel.updateOne(
      { _id: id },
      { $set: { title } }
    );
    if (editedCategory.modifiedCount === 0)
      throw createError.InternalServerError("بروز رسانی دسته انجام نگرفت");
    return "بروز رسانی با موفقیت انجام گرفت";
  }
  async checkExistCategory(id) {
    const category = await this.#categoryModel.findById(id);
    if (!category) throw createError.NotFound("دسته ای یافت نشد");
    return category;
  }
})();
