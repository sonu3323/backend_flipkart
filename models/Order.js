const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema();

const ProductCartSchema = new mongoose.Schema({
  product: { type: ObjectId, ref: "Product" },
  name: String,
  count: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: { type: String, mixLength: 100 },
    update: Date,
    user: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

exports.module = { Order, ProductCart };
