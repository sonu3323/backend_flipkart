const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    mixLength: 32,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    mixLength: 100,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    required: true,
    default: 0,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
