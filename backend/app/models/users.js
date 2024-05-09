const { Schema, models, model, Types } = require("mongoose");


const ProductSchema = new Schema({
  productID:{type:Types.ObjectId,ref:"Product"},
  count:{type:Number,default:1}
})
const CourseSchema = new Schema({
  courseID:{type:Types.ObjectId, ref:"Course"},
  count:{type:Number,default:1}
  
})
const BasketSchema = new Schema({
    course:{type:[CourseSchema],default:[]},
    product:{type:[ProductSchema],default:[]}
})
const UserSchema = new Schema({
  first_name: { type: String},
  last_name: { type: String},
  username: { type: String, lowercase:true},
  email:{type:String,lowercase:true},
  mobile: { type: String, required: true },
  password: { type: String},
  otp: {
    type: Object,
    default: {
      code: 0,
      expiresIn : 0,
    },
  },
  bills: { type: [], default: [] },
  discount: { type: Number, default: 0 },
  birthday: { type: String },
  Role:{type:String,default:"USER"},
  courses:{type:[Types.ObjectId],ref:"Course",default:[]},
  products:{type:[Types.ObjectId],ref:"Product",default:[]},
  basket:{type: BasketSchema}
},{
  timestamps:true,
  toJSON:{
    virtuals: true
  }
});


UserSchema.index({first_name:"text",last_name:"text",mobile:"text",email:"text",username:"text"})

const userModel = models.User || model("User", UserSchema);




module.exports = {
  userModel,
};
