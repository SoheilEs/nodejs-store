const autoBind = require("auto-bind");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const permissionService = require("./permission.service");
const { addPermissionSchema } = require("../../../validators/RBAC/permission.schema");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../../utils/function");

class PermissionController extends Controller {
    #permissionService
    constructor(){
        super()
        autoBind(this)
        this.#permissionService = permissionService
    }
    async addPermissions(req, res, next){
        try{

            
            const {title, description} = await addPermissionSchema.validateAsync(req.body)
           
            const result = await this.#permissionService.addPermissions({title,description})
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                    message: result
                }
            })
        }catch(error){
            next(error)
        }
    }
    async getPermissions(req, res, next){
        try{
            const permissions = await this.#permissionService.getPermissions()
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    permissions
                }
            })
        }catch(error){
            next(error)
        }
    }
    async deletePermissions(req, res, next){
        try{
            const{id} = req.params
            const result = await this.#permissionService.removePermmissionById(id)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message: result
                }
            })
        }catch(error){
            next(error)
        }
    }
    async editPermissions(req, res, next){
        try{
            const {id} = req.params 
            const data = copyObject(req.body)
            deleteInvalidPropertyInObject(data,[])
            const result = await this.#permissionService.editPermissionById(id,data)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                date:{
                    message: result
                }
            })
        }catch(error){
            next(error)
        }
    }

}

module.exports = new PermissionController()