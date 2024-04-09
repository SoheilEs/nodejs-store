const { Schema, models, model, Types } = require("mongoose");
const { commentSchema } = require("./public.schema");



const blogSchema = new Schema(
  {
    author: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: [Types.ObjectId], ref: "Category", required: true },
    commments: { type: [commentSchema], default: [] },
    likes: { type: [Types.ObjectId], ref: "User", default: [] },
    dislikes: { type: [Types.ObjectId], ref: "User", default: [] },
    bookmarks: { type: [Types.ObjectId], ref: "User", default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
  }
);

const blogModel = models.Blog || model("Blog", blogSchema);

module.exports = {
  blogModel,
};
