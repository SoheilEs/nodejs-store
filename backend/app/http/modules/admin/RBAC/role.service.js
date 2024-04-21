const autoBind = require("auto-bind");
const { RoleModel } = require("../../../../models/role");
const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");

class RoleService {
    #roleModel
    constructor(){
        autoBind(this)
        this.#roleModel = RoleModel
    }
    
    async ListAllRoles(){
        return await this.#roleModel.find({},{__v:0}).populate([{path:"permissions"}])
    }
    async createNewRole({title,description,permissions}){
       
        await this.findRoleWithTitle(title)
        const role = await this.#roleModel.create({title,description,permissions})
        if(!role) throw createHttpError.BadRequest("نقش ایجاد نشد")
        return "نقش با موفقیت ایجاد گردید"
    }

    async removeRole(field){
        const role = await this.findRoleWithIdOrTitle(field)
        const removeResult = await this.#roleModel.deleteOne({_id:role._id})
        if(!removeResult.deletedCount) throw createHttpError.InternalServerError("حذف نقش انجام نگرفت")
        return "حذف فصل با موفقیت انجام گرفت" 
    }

    async editRoleById(id,data){
        const role = await this.findRoleWithIdOrTitle(id)
        const updateResult = await this.#roleModel.updateOne({_id:role._id},{
            $set:data
        })
        if(!updateResult.modifiedCount) throw createHttpError.InternalServerError("بروز رسانی نقش انجام نگرفت")
        return "بروز رسانی با موفقیت انجام گرفت"
    }

    async findRoleWithTitle(title){
        const role = await this.#roleModel.findOne({title:title})
        if(role) throw createHttpError.BadRequest("نقش مورد نظر قبلا ثبت شده است")
        
    }
    async findRoleWithIdOrTitle(field){
        let findQuery = isValidObjectId(field) ? {_id:field} : {title:field}
        const role = await this.#roleModel.findOne(findQuery)
        if(!role) throw createHttpError.NotFound("نقشی یافت نشد")
        return role
    }
}

module.exports = new RoleService()