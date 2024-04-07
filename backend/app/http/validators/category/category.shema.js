const Joi = require("@hapi/joi")

const categorySchema = Joi.object({
    title : Joi.string().min(3).max(30).trim().required().error(new Error("عنوان وارد شده صحیح نمی باشد")),
    parent: Joi.string().allow("").trim().pattern(/^[0-9a-fA-F]{24}$/).error(new Error("شناسه وارد شده صحیح نمی باشد"))
})

module.exports = {
    categorySchema
}