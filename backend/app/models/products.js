const { Schema, models, model, Types } = require("mongoose");
const { commentSchema } = require("./public.schema");

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    comments: { type: [commentSchema], default: [] },
    likes: { type: [Types.ObjectId], default: [],ref:"User" },
    dislikes: { type: [Types.ObjectId], default: [],ref:"User"  },
    bookmarks: { type: [Types.ObjectId], default: [],ref:"User"   },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true }, // virtual( online tutorilas: Node course, Python course) - physical(sells: book, bag ....)
    format: { type: String },
    supplier: { type: Types.ObjectId, ref: "User", required: true },
    features: {
      type: Object,
      default: {
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        model: [],
        madeIn: "",
      },
    },
  },
  { versionKey: false, id: false, toJSON: { virtuals: true } }
);

productSchema.index({ title: "text", short_text: "text", text: "text" });

productSchema.virtual("imagesURL").get(function () {
  return this.images.map(
    (image) =>
      `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${image}`
  );
});
const productModel = models.Product || model("Product", productSchema);

module.exports = {
  productModel,
};
