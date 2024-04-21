const Joi = require("@hapi/joi")
const createError = require("http-errors")


const addRoleSchema = Joi.object({
    title: Joi.string().required().min(3).max(30).error(createError.BadRequest("عنوان نقش صحیح نمی باشد")),
    description: Joi.string().trim().min(0).max(100).error(createError.BadRequest("توضیحات نقش صحیح نمی باشد")),
    permissions: Joi.array().items(Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)).error(createError.BadRequest("مجوزهای ارسال شده صحیح نمی باشد")),
})

module.exports = {
    addRoleSchema
}