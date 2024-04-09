const autoBind = require("auto-bind")
const { productModel } = require("../../../models/products")
const createError = require("http-errors")
const { isValidObjectId} = require("mongoose")
const { categoryModel } = require("../../../models/categories")

class ProductService {
    #productModel
    #categoryModel
    constructor(){
        autoBind(this)
        this.#productModel = productModel
        this.#categoryModel = categoryModel
    }

    async addProduct(productData){
        
       if(isValidObjectId(productData.category)){
        
         const category = await this.#categoryModel.findById(productData.category)
         if(!category) throw createError.NotFound("دسته ای با این شناسه وجود ندارد")
       }
        return await this.#productModel.create(productData)
    }
    async getProducts(){
        return await this.#productModel.find({},{_v:0})
    }
    
}

module.exports = new ProductService()