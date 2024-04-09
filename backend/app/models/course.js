const { Schema, models, model, Types } = require("mongoose");
const { commentSchema } = require("./public.schema");

const episodeSchema = new Schema({
    title:{type:String,required:true},
    description:{type: String, required:true},
    type:{type:String, default:"free"},
    time:{type: String, required: true}
})

const chapterSchema = new Schema({
    title:{type: String,required:true},
    description:{type: String,default:""},
    episodes:{type:[episodeSchema],default:[]}
})

const courseSchema = new Schema({
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  images: { type: String, required: true },
  tags:{type:[String],default:[]},
  category:{type: Types.ObjectId,ref:"Category",required:true},
  commments:{type:[commentSchema],default:[]},
  likes :{types:[Types.ObjectId],default:[]},
  dislikes:{types:[Types.ObjectId],default:[]},
  bookmarks:{types:[Types.ObjectId],default:[]},
  price:{type:Number,default:0},
  discount:{type:Number,default:0},
  type:{type: String, default:"free" ,required: true }, // پولی یا رایگان
  time:{type: String, default:"00:00:00"},
  teacher:{type: String, ref:"User" ,required: true },
  chapter: {type:[chapterSchema],default:[]},
  students:{type:[Types.ObjectId],ref:"User",default:[]}
  

});

const courseModel = models.Course || model("Course", courseSchema);

module.exports = {
  courseModel,
};