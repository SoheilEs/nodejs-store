const { Schema ,Types } = require("mongoose");

const AnsewerSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    default: "",
    required: true,
  },
  show:{
    type: Boolean,
    required:true,
    default:false,
  },
  openToComment:{type:Boolean,default:false},
},{timestamps:{createdAt:true}})
const commentSchema = new Schema({
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      default: "",
      required: true,
    },
    show:{
      type: Boolean,
      required:true,
      default:false,
    },
    openToComment:{type:Boolean,default:true},
    answers: { type: [AnsewerSchema], default:[]},
  },{timestamps:{createdAt:true}});

  module.exports = {
    commentSchema
  }