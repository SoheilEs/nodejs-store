const autoBind = require("auto-bind");
const { userModel } = require("../../../../models/users");
const createHttpError = require("http-errors");


class UserService {
    #userModel
    constructor(){
        autoBind(this)
        this.#userModel = userModel
    }
    async getAllUsers(search){
        const databaseQuery = {}
        if(search) databaseQuery["$text"] = {$search: search}
        const users =  await this.#userModel.find(databaseQuery)
        return users
    }
    async updateUser(id,data){
        const updateResult = await this.#userModel.updateOne({
            _id:id,
        },{
            $set:data
        })
        if(!updateResult.modifiedCount) throw createHttpError.BadRequest("بروز رسانی کاربر انجام نگرفت")
        return "بروز رسانی با موفقیت انجام شد"
    }

}

module.exports = new UserService()