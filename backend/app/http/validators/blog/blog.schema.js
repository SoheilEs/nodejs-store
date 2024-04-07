const Joi = require("@hapi/joi")
const { create } = require("@hapi/joi/lib/ref")
const createHttpError = require("http-errors")

const createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).required().error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
    text: Joi.string().required().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    short_text: Joi.string().required().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    tags:Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمی توانند بیشتر از ۲۰ آیتم باشند")),
    category: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    fileUploadPath: Joi.allow()

})

module.exports = {
    createBlogSchema
}