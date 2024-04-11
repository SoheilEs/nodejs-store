const Joi = require("@hapi/joi")
const createError = require("http-errors")

const addProductSchema = Joi.object({
    title: Joi.string().min(3).max(30).required().error(createError.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
    text: Joi.string().required().error(createError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    short_text: Joi.string().required().error(createError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    tags:Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمی توانند بیشتر از ۲۰ آیتم باشند")),
    category: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/).error(createError.BadRequest("شناسه دسته صحیح نمی باشد")),
    fileUploadPath: Joi.allow(),
    discount: Joi.number().required().error(createError.BadRequest("تخفیف وارد شده صحیح نمی باشد")),
    price: Joi.number().required().error(createError.BadRequest("قیمت وارد شده صحیح نمی باشد")),
    count: Joi.number().required().error(createError.BadRequest("تعداد وارد شده صحیح نمی باشد")),
    height: Joi.number().allow(null,0,"0","").error(createError.BadRequest("ارتفاع وارد شده صحیح نمی باشد")),
    width: Joi.number().allow(null,0,"0","").error(createError.BadRequest("عرض وارد شده صحیح نمی باشد")),
    weight: Joi.number().allow(null,0,"0","").error(createError.BadRequest("وزن وارد شده صحیح نمی باشد")),
    length: Joi.number().allow(null,0,"0","").error(createError.BadRequest("طول وارد شده صحیح نمی باشد")),
    color: Joi.array().allow(null,0,"0","").error(createError.BadRequest("رنگ های وارد شده صحیح نمی باشد")),
    type: Joi.string().regex(/(virtual|phisical)/i).required().error(createError.BadRequest("نوع محصول باید مشخص باشد")),
    colors: Joi.array().min(0).max(20).error(createError.BadRequest("رنگ های انتخابی  نمیتواند بیشتر از 20 ایتم باشد")),
})

module.exports = {
    addProductSchema
}