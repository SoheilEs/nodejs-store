const autoBind = require("auto-bind");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const roleService = require("./role.service");
const { addRoleSchema } = require("../../../validators/RBAC/role.schema");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../../utils/function");


class RoleController extends Controller {
    #RoleService
    constructor(){
        super()
        autoBind(this)
        this.#RoleService = roleService
    }
    
    async addRole(req,res,next){
        try{
            console.log(req.body.permissions);
            const {title,description,permissions} = await addRoleSchema.validateAsync(req.body)
            
            const roleAddResult = await this.#RoleService.createNewRole({title,description,permissions})
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                date:{
                    message: roleAddResult
                }
            })
        }catch(error){
            next(error)
        }
    }
    async getRoles(req,res,next){
        try{
            const roles = await this.#RoleService.ListAllRoles()
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                date:{
                    roles
                }
            })
        }catch(error){
            next(error)
        }
    }
    async editRoleById(req,res,next){
        try{
            const {id} = req.params 
            const data = copyObject(req.body)
            deleteInvalidPropertyInObject(data,[])
            const result = await this.#RoleService.editRoleById(id,data)
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
    async deleteRoleById(req,res,next){
        try{
            const {field} = req.params
            const result = await this.#RoleService.removeRole(field)
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

module.exports = new RoleController()