const autoBind = require("auto-bind");
const { productModel } = require("../../../../models/products");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const { categoryModel } = require("../../../../models/categories");
const {
  deleteFile,
  deleteInvalidPropertyInObject,
} = require("../../../../utils/function");

const ProductBlackList = {
  BOOKMARKS: "bookmarks",
  DISLIKES: "dislikes",
  COMMENTS: "commments",
  LIKES: "likes",
  SUPPLIER: "supplier",
  WIDTH: "width",
  LENGTH: "length",
  HEIGHT: "height",
  WEIGHT: "weight",
  COLORS: "colors",
};
Object.freeze(ProductBlackList);

class ProductService {
  #productModel;
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#productModel = productModel;
    this.#categoryModel = categoryModel;
  }

  async addProduct(productData) {
    if (isValidObjectId(productData.category)) {
      const category = await this.#categoryModel.findById(productData.category);
      if (!category)
        throw createError.NotFound("دسته ای با این شناسه وجود ندارد");
    }
    return await this.#productModel.create(productData);
  }
  async getProducts(search) {
    if (search) {
      const products = await this.#productModel.find(
        {
          $text: {
            $search: search,
          },
        },
        { _v: 0 }
      ).populate([{path:"category"},{path:"supplier"}])
      return products;
    }
    const products = await this.#productModel.find({}, { _v: 0 }).populate([{path:"category"},{path:"supplier",select:["first_name","last_name","mobile","email"]}])
    if (products.length === 0) throw createError.NotFound("محصولی یافت نشد");
    return products;
  }
  async getProductById(id) {
    this.checkValidObjectId(id);
    const product = await this.#productModel.findById(id).populate([
      { path: "category", select: ["title"] },
      {
        path: "supplier",
        select: ["mobile", "username", "last_name", "first_name"],
      },
    ]);
    if (!product) throw createError.NotFound("محصولی یافت نشد");
    return product;
  }
  async deleteProduct(id) {
    this.checkValidObjectId(id);
    const product = await this.checkExistsProduct(id);
    if (!product) throw createError.NotFound("محصولی یافت نشد");
    const deleteResult = await this.#productModel.deleteOne({
      _id: product._id,
    });
    if (product.images.length > 0)
      product.images.map((image) => deleteFile(image));

    if (deleteResult.deletedCount === 0)
      throw createError.InternalServerError("حذف محصول انجام نگردید");
    return "محصول مورد نظر حذف گردید";
  }
  async updateProduct(supplier, id, data) {
    let blackListFields = Object.values(ProductBlackList);
    deleteInvalidPropertyInObject(data, blackListFields);
    if (!isValidObjectId(id))
      throw createError.NotFound("شناسه محصول نامعتبر است");
    const product = await this.checkExistsProduct(id);
    if (product.supplier !== supplier.toHexString())
      throw createError.Unauthorized("شما مجاز به انجام این کار نیستید");
    if (!product?._id) throw createError.NotFound("محصولی یافت نشد");
    const updateProduct = await this.#productModel.updateOne(
      { _id: product._id },
      { $set: data }
    );
    if (updateProduct.modifiedCount === 0)
      throw createError.InternalServerError("بروز رسانی صورت نگرفت");
    return "بروز رسانی با موفقیت انجام گردید";
  }
  async checkExistsProduct(id) {
    return await this.#productModel.findById(id);
  }
  checkValidObjectId(id) {
    if (!isValidObjectId(id))
      throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");
  }
}

module.exports = new ProductService();
