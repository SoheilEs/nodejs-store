const autoBind = require("auto-bind");
const Controller = require("../controller");
const { ConversationModel } = require("../../../models/conversation");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

class NamespaceController extends Controller {
    constructor(){
        super()
        autoBind(this)
    }
    async addNamespace(req,res,next){
        try{
            const {title, endpoint} = req.body
            await this.findNamespaceWithEndpoint(endpoint)
            const conversation = await ConversationModel.create({title, endpoint})
            if(!conversation) throw createHttpError.InternalServerError("فضای مکالمه ایجاد نشد")
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                    conversation,
                    message:"فضای مکالمه با موفقیت ایجاد شد"
                }
            })

        }catch(error){
            next(error)
        }
    }
    async getListOfNamespace(req,res,next){
        try{

            const nameSpace = await ConversationModel.find({},{rooms:0})
            if(!nameSpace) throw createHttpError.NotFound("فضای مکالمه یافت نشد")
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    nameSpace,
                   
                }
            })

        }catch(error){
            next(error)
        }
    }

    async findNamespaceWithEndpoint(endpoint){
        const conversation = await ConversationModel.findOne({endpoint})
        if(conversation) throw createHttpError.BadRequest("این اسم قبلا انتخاب شده است")
    }
}


module.exports = new NamespaceController()