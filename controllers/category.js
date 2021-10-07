const Category = require("../models/category");

const createCatgory = async (req, res) => {
  const category_name_field = "categoryName";

  if (Object.keys(req.body)[0] !== category_name_field) {
    return res
      .status(403)
      .send({ status: "error", message: "Input field is wrong !" });
  }

  const data = req.body;

  try {
    const category = new Category(data);

    const saveData = await category.save();

    res.status(201).send({
      status: "success",
      message: "category create successfully",
      data: saveData,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message:
        "Something went wrong while saving category OR Duplicate category",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const getAllCategories = await Category.find();

    res.status(200).send({
      status: "error",
      message: "Categories fetch successfully!",
      data: getAllCategories,
    });

    console.log(getAllCategories);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Something went wrong while fetching categories",
    });
  }
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  const category_name_field = "categoryName";

  if (Object.keys(req.body)[0] !== category_name_field) {
    return res
      .status(403)
      .send({ status: "error", message: "Input field is wrong !" });
  }

  try {
    const updateCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
      }
    );

    const getAllCategories = await Category.find();

    if (updateCategory) {
      res.status(200).send({
        error: "success",
        message: "Category name is update successfully",
        data: getAllCategories,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Something went wrong while updating category name",
    });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.CategoryId;

  await Category.findByIdAndRemove(categoryId);

  const getAllCategories = await Category.find();

  res.status(200).send({
    status: "success",
    message: "Category delete successfully",
    data: getAllCategories,
  });

  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Something went wrong while deleting the category",
    });
  }
};

const getCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Category.findById(categoryId);

    res.status(200).send({
      status: "success",
      message: "Category delete successfully",
      data: category,
      categoryName: category.categoryName,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Something went wrong while fetching category id",
    });
  }
};

module.exports = {
  createCatgory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
