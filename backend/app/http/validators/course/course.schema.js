const Joi = require("@hapi/joi")
const createError = require("http-errors")


const addCourseSchema = Joi.object({
    title: Joi.string().min(3).max(30).required().error(createError.BadRequest("عنوان دوره صحیح نمی باشد")),
    text: Joi.string().required().error(createError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    short_text: Joi.string().required().error(createError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    tags:Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمی توانند بیشتر از ۲۰ آیتم باشند")),
    category: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/).error(createError.BadRequest("شناسه دسته صحیح نمی باشد")),
    fileUploadPath: Joi.allow(),
    discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمی باشد")),
    price: Joi.number().required().error(createError.BadRequest("قیمت وارد شده صحیح نمی باشد")),
    type: Joi.string().regex(/(free|cash|vip)/i).required().error(createError.BadRequest("نوع دوره باید مشخص باشد")),
   
})

const episodeAddSchema = Joi.object({
    title: Joi.string().min(3).max(30).required().error(createError.BadRequest("عنوان قسمت صحیح نمی باشد")),
    text: Joi.string().required().error(createError.BadRequest("توضیحات ارسال شده صحیح نمی باشد")),
    type: Joi.string().regex(/(lock|unlock)/i).required().error(createError.BadRequest("نوع قسمت باید مشخص باشد")),
    chapterID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(createError.BadRequest("شناسه فصل نامعتبر است")),
    courseID:Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(createError.BadRequest("شناسه دوره نامعتبر است")),
    fileUploadPath: Joi.allow(),
    filename: Joi.string().pattern(/(\.mpg|\.mp4|\.mkv|\.avi|\.mov)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
})  


module.exports = {
    addCourseSchema,
    episodeAddSchema
}