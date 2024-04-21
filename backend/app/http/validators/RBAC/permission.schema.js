const Joi = require("@hapi/joi")
const createError = require("http-errors")


const addPermissionSchema = Joi.object({
    title: Joi.string().trim().required().min(3).max(30).error(createError.BadRequest("عنوان مجوز صحیح نمی باشد")),
    description: Joi.string().trim().min(0).max(100).error(createError.BadRequest("توضیحات مجوز صحیح نمی باشد")),
})

module.exports = {
    addPermissionSchema
}