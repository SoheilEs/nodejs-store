const autoBind = require("auto-bind");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const userService = require("./user.service");
const { deleteInvalidPropertyInObject } = require("../../../../utils/function");



class UserController extends Controller{
    #userService
    constructor(){
        super()
        autoBind(this)
        this.#userService = userService
    }

    async addUser(req,res,next){
        try{
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                    message:"کاربر با موفقیت ایجاد گردید"
                }
            })
        }catch(error){
            next(error)
        }
    }
    async getUsers(req,res,next){
        try{
            const {search} = req.query
            const users = await this.#userService.getAllUsers(search)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    users
                }
            })
        }catch(error){
            next(error)
        }
    }
    async deleteUser(req,res,next){
        try{
            
        }catch(error){
            next(error)
        }
    }
    async editUser(req,res,next){
        try{
            const userID = req.user._id
            const data = req.body
            deleteInvalidPropertyInObject(data,["mobile","otp","bills","discount","role","courses"])
            const result = await this.#userService.updateUser(userID,data)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message:result
                }
            })
        }catch(error){
            next(error)
        }
    }
    async getProfile(req,res,next){
        try{
            const user = req.user
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    user
                }
            })
        }catch(error){
            next(error)
        }
    }
}

module.exports = new UserController()