const { Schema ,Types } = require("mongoose");
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
    createdAt: { type: Date, default: () => Date.now() },
    parent: { type: Types.ObjectId,ref:"comment" },
  });

  module.exports = {
    commentSchema
  }