const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        product: { type: Object },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("Cart", CartSchema);
