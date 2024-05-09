const autoBind = require("auto-bind");
const Controller = require("../controller");
const path = require("path")
const { ConversationModel } = require("../../../models/conversation");
const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-errors");


class RoomController extends Controller {
    constructor(){
        super()
        autoBind(this)
    }
    async addRooms(req,res,next){
        try{
            const {name, description, filename, fileUploadPath, namespace} = req.body
            await this.findConversationWithEndpoint(namespace)
            await this.findRoomWithName(name)
            const image = path.join(fileUploadPath,filename).replace(/\\/g, "/");
            const room = {name,description,image}
            const conversation = await ConversationModel.updateOne({endpoint:namespace},{
                $push:{rooms: room}
            })
            if(!conversation) throw createHttpError.InternalServerError("فضای مکالمه ایجاد نشد")
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                   
                    message:"اتاق با موفقیت ایجاد شد"
                }
            })

        }catch(error){
            next(error)
        }
    }
    async getListOfRooms(req,res,next){
        try{

            const conversation = await ConversationModel.find({},{rooms:1})

      
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    rooms: conversation,
                   
                }
            })

        }catch(error){
            next(error)
        }
    }
    async findRoomWithName(name){
        const room = await ConversationModel.findOne({"rooms.name":name})
        if(room) throw createHttpError.BadRequest("این اسم قبلا انتخاب شده است")
    }
    async findConversationWithEndpoint(endpoint){
        const conversation = await ConversationModel.findOne({endpoint})
        if(!conversation) throw createHttpError.NotFound("فضای مکالمه ای بافت نشد")
    }
}


module.exports = new RoomController()