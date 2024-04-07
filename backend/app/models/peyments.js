const { Schema, models, model } = require("mongoose");

const paymentSchema = new Schema({});

const paymentModel = models.Payment || model("Payment", paymentSchema);

module.exports = {
  paymentModel,
};
