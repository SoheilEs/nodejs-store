const autoBind = require("auto-bind");
const Controller = require("../controller");
const productService = require("./product.service");
const { addProductSchema } = require("../../validators/product/product.schema");
const path = require("path");
const { deleteFile, listOfimagesFromRequest } = require("../../../utils/function");
class ProductController extends Controller {
  #service;
  constructor() {
    super();
    autoBind(this);
    this.#service = productService;
  }

  async addProducts(req, res, next) {
    try {
        const images = listOfimagesFromRequest(req?.files || [],req.body.fileUploadPath)
        const productBody = await addProductSchema.validateAsync(req.body);
        const {
        title,
        text,
        short_text,
        category,
        tags,
        count,
        price,
        discount,
        width,
        height,
        length,
        color,
        weight,
      } = productBody;
      
      const supplier = req.user._id;
      let feture = {},
        type = "physical";
      if (weight || height || length || width || color) {
        if (!width) feture.width = 0;
        else feture.weight = width;
        if (!height) feture.height = 0;
        else feture.height = height;
        if (!length) feture.length = 0;
        else feture.length = length;
        if (!weight) feture.weight = 0;
        else feture.weight = weight;
        if (!color) feture.color = [];
        else feture.color = color;
      } else {
        type = "virtual";
      }
      const product = await this.#service.addProduct({
        title,
        text,
        short_text,
        category,
        tags,
        count,
        price,
        discount,
        supplier,
        feture,
        images,
        type,
      });
      return res.status(201).json({
        data: {
          statusCode: 401,
          result: product,
          message: "محصول با موفقیت ایجاد گردید",
        },
      });
    } catch (error) {
      deleteFile(req.body.image);
      next(error);
    }
  }
  async getProducts(req, res, next) {
    try {
      const products = await this.#service.getProducts();
      return res.status(200).json({
        data: {
          products,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async editProductById(req, res, next) {
    try {
      res.send("hello from  product page");
    } catch (error) {
      next(error);
    }
  }
  async deleteProductById(req, res, next) {
    try {
      res.send("hello from  product page");
    } catch (error) {
      next(error);
    }
  }
  async getProductById(req, res, next) {
    try {
      res.send("hello from  product page");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
