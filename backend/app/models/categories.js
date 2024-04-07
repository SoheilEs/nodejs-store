const { Schema, models, model, Types } = require("mongoose");

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: "Category", default: undefined },
  },
  { versionKey: false, id: false, toJSON: { virtuals: true } }
);

categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});
function autoPopulate(next) {
  this.populate([{ path: "children" }]);
  next();
}
categorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate);
const categoryModel = models.Category || model("Category", categorySchema);

module.exports = {
  categoryModel,
};
