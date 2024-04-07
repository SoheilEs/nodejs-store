const { Schema, models, model } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true },
  short_desc: { type: String, required: true },
  total_desc: { type: String, required: true },
  images: { type: [String], required: true },
  tags:{type:[String],default:[]},
  category:{type: Types.ObjectId,required:true},
  commments:{type:[],default:[]},
  like:{types:[Types.ObjectId],default:[]},
  dislike:{types:[Types.ObjectId],default:[]},
  bookmark:{types:[Types.ObjectId],default:[]},
  price:{type:Number,default:0},
  discount:{type:Number,default:0},
  count:{type:Number},
  type:{type: String, required: true },
  time:{type: String,},
  format:{type: String},
  teacher:{type: String, required: true },
  feture:{type:Object,default:{
    length:"",
    height: "",
    width:"",
    weight:"",
    color:[],
    model:[],
    madeIn:""
  }}

});

const productModel = models.Product || model("Product", productSchema);

module.exports = {
  productModel,
};
