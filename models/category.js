const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      minLength: 3,
      mixLength: 30,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// categorySchema.methods.toJSON = function () {
//   console.log("I am millde ware of category");
//   const category = this;

//   const categoryObject = category.toObject();

//   delete categoryObject.__v;

//   console.log(categoryObject);

//   return categoryObject;
// };

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
