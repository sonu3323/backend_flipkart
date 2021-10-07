const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  getprooduct ,
  deleteProduct
} = require("../controllers/product");
const { isAdmin, auth } = require("../middleware/auth");

const router = express.Router();

router.post("/createproduct", auth, isAdmin, createProduct);

router.get("/getallproducts", getAllProducts);

router.get("/getproduct/:productId" , getprooduct)

router.put("/updateproduct/:productid", auth, isAdmin, updateProduct);

router.delete("/productdelete/:productid", auth, isAdmin, deleteProduct);


module.exports = router;
