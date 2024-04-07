const { Schema, models, model } = require("mongoose");

const sliderSchema = new Schema({
  title: { type: String },
  text: { type: String },
  image: { type: String, required: true },
  type: { type: String, default: "main" },
});

const sliderModel = models.Category || model("Slider", sliderSchema);

module.exports = {
  sliderModel,
};
