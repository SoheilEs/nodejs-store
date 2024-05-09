const { type } = require("@hapi/joi/lib/extend");
const { Schema, Types, models, model } = require("mongoose");


const message = new Schema({
    sender:{type: Types.ObjectId,ref:"User"},
    message:{type: String},
    dateTime:{type: String}
})

const roomSchema = new Schema({
    name:{type: String},
    description:{type: String},
    image:{type: String},
    messages:{
        type:[message],
        default:[]
    }
})

const conversationSchema = new Schema({
    title:{type:String,required:true},
    endpoint:{type:String,required:true},
    rooms:{type:[roomSchema],default:[]}
})


const conversationModel = models.Conversation || model("Conversation",conversationSchema)


module.exports = {
    ConversationModel:conversationModel
}
