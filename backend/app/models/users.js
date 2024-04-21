const { Schema, models, model, Types } = require("mongoose");

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
  courses:{type:[Types.ObjectId],ref:"Course",default:[]}
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
