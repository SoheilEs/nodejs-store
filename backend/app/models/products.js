const { Schema, models, model,Types } = require("mongoose");
const { commentSchema } = require("./public.schema");

const productSchema = new Schema({
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  images: { type: [String], required: true },
  tags:{type:[String],default:[]},
  category:{type: Types.ObjectId,ref:"Category",required:true},
  commments:{type:[commentSchema],default:[]},
  likes :{types:[Types.ObjectId],default:[]},
  dislikes:{types:[Types.ObjectId],default:[]},
  bookmarks:{types:[Types.ObjectId],default:[]},
  price:{type:Number,default:0},
  discount:{type:Number,default:0},
  count:{type:Number},
  type:{type: String, required: true }, // virtual( online tutorilas: Node course, Python course) - physical(sells: book, bag ....)
  format:{type: String},
  supplier:{type: String, required: true },
  feture:{type:Object,default:{
    length:"",
    height: "",
    width:"",
    weight:"",
    color:[],
    model:[],
    madeIn:""
  }}

},{versionKey:false});

const productModel = models.Product || model("Product", productSchema);

module.exports = {
  productModel,
};
