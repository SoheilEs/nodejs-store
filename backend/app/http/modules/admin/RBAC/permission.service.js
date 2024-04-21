const autoBind = require("auto-bind");
const { PermissionsModel } = require("../../../../models/permission");
const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");


class PermissionService {
    #permissionModel
    constructor(){
        autoBind(this)
        this.#permissionModel = PermissionsModel
    }
    async getPermissions(){
        return await this.#permissionModel.find({})
    }
    async addPermissions({title,description}){
        
        await this.findPermissionByTitle(title)
        const permission = await this.#permissionModel.create({title,description})
        if(!permission) throw createHttpError.InternalServerError("مجوز ثبت نشد")
        return "مجوز با موفقیت ثبت گردید"

    }
    async removePermmissionById(id){
        const permission = await this.findPermissionById(id)
        const removeResult = await this.#permissionModel.deleteOne({_id:permission._id})
        if(!removeResult.deletedCount) throw createHttpError.InternalServerError("عملیات حذف مجوز انجام نگرفت")
        return "مجوز با موفقیت حذف گردید"
    }
    async editPermissionById(id,data){
        const permission = await this.findPermissionById(id)
        const editResult = await this.#permissionModel.updateOne({_id:permission._id},{
            $set:data
        }) 
        if(!editResult.modifiedCount) throw createHttpError.InternalServerError("بروز رسانی مجوز انجام نشد")
        return "بروز رسانی با موفقیت انجام شد"

    }
    async findPermissionByTitle(title){
        const permission = await this.#permissionModel.findOne({title:title})
        if(permission) throw createHttpError.BadRequest("مجوز مورد نظر قبلا ثبت شده است")
    }
    async findPermissionById(id){
        if(!isValidObjectId(id)) throw createHttpError.BadRequest("شناسه معتبر نمی باشد")
        const permission = await this.#permissionModel.findById(id)
        if(!permission) throw createHttpError.NotFound("مجوزی یافت نشد")
        return permission
    }
    

}

module.exports = new PermissionService()