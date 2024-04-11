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
  likes :{type:[Types.ObjectId],default:[]},
  dislikes:{type:[Types.ObjectId],default:[]},
  bookmarks:{type:[Types.ObjectId],default:[]},
  price:{type:Number,default:0},
  discount:{type:Number,default:0},
  count:{type:Number},
  type:{type: String, required: true }, // virtual( online tutorilas: Node course, Python course) - physical(sells: book, bag ....)
  format:{type: String},
  supplier:{type: String,ref:"User" ,required: true },
  features:{type:Object,default:{
    length:"",
    height: "",
    width:"",
    weight:"",
    colors:[],
    model:[],
    madeIn:""
  }}

},{versionKey:false});

productSchema.index({title:"text",short_text:"text",text:"text"})

const productModel = models.Product || model("Product", productSchema);

module.exports = {
  productModel,
};
