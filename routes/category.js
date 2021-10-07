const express = require("express");
const {
  createCatgory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/category");
const { isAdmin, auth } = require("../middleware/auth");

const router = express.Router();

router.post("/createcategory", auth, isAdmin, createCatgory);
router.get("/getallcategories", getAllCategories);
router.get("/getcategory/:categoryId", getCategory);
router.put("/updatecategory/:categoryId", auth, isAdmin, updateCategory);
router.delete("/deletecategory/:categoryId", auth, isAdmin, deleteCategory);

module.exports = router;
