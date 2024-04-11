const autoBind = require("auto-bind");
const Controller = require("../controller");
const productService = require("./product.service");
const { addProductSchema } = require("../../validators/product/product.schema");
const { StatusCodes } = require("http-status-codes");
const {
  deleteFile,
  listOfimagesFromRequest,
  copyObject,
  setFeatures,
} = require("../../../utils/function");
class ProductController extends Controller {
  #service;
  constructor() {
    super();
    autoBind(this);
    this.#service = productService;
  }

  async addProducts(req, res, next) {
    try {
      const images = listOfimagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );

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
        type,
      } = productBody;

      const supplier = req.user._id;
      const features = setFeatures(req.body);

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
        features,
        images,
        type,
      });
      return res.status(StatusCodes.CREATED).json({
        data: {
          statusCode: StatusCodes.CREATED,
          result: product,
          message: "محصول با موفقیت ایجاد گردید",
        },
      });
    } catch (error) {
      deleteFile(req?.body?.images);
      next(error);
    }
  }
  async getProducts(req, res, next) {
    try {
      const search = req.query.search || "";
      const products = await this.#service.getProducts(search);
      return res.status(StatusCodes.OK).json({
        data: {
          products,
          statusCode: StatusCodes.OK,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteProductById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await this.#service.deleteProduct(id);
      return res.status(StatusCodes.OK).json({
        data: {
          statusCode: StatusCodes.OK,
          message: result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.#service.getProductById(id);
      return res.status(StatusCodes.OK).json({
        data: {
          product,
          statusCode: StatusCodes.OK,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProductById(req, res, next) {
    try {
      const { id } = req.params;
      const { _id: supplier } = req.user;
     
      const data = copyObject(req.body);
      data.images = listOfimagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      data.features = setFeatures(req.body);
      const result = await this.#service.updateProduct(supplier, id, data);
      return res.status(StatusCodes.OK).json({
        data: {
          statusCode: StatusCodes.OK,
          message: result,
        },
      });
    } catch (error) {
      deleteFile(req?.body?.images);
      next(error);
    }
  }
}


module.exports = new ProductController();
