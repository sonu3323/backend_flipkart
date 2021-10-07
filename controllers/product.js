const formidable = require("formidable");
const _ = require("lodash");
const Product = require("../models/product");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();

    form.keepExtension = true;

    form.parse(req, (error, fields, file) => {
      if (error) {
        console.log("Error parsing the files");
        return res.status(400).json({
          status: "Fail",
          message: "There was an error parsing the files",
          error: err,
        });
      }

      console.log(file, fields);

      const { name, description, price, stock, category } = fields;

      if (!name || !description || !price || !stock || !category) {
        return res.status(400).send({
          status: "False",
          error: "Values are not correct , Please correct that.",
        });
      }

      //  TODO == Restriction on field.

      const product = new Product(fields);

      // TODO == HANDLE FILE HERE

      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).send({
            error: "file size is too big",
          });
        }

        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;

        product
          .save()
          .then((result) => {
            res.status(200).send({
              status: "success",
              data: result,
            });
          })
          .catch((error) => {
            return res.status(400).send({
              status: "file is not saving in DB",
              error: error,
            });
          });

        // console.log(product);
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ error, status: "false", message: "Data not save in DB" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const data = await Product.find();
    const count = await Product.countDocuments();

    if (!data) {
      res.status(400).send({
        status: "error",
        message: "Products are empty",
      });
    }
    res.status(200).send({
      status: "success",
      message: "data fetch sucessfully.",
      data,
      count,
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      status: "error",
      message: "Error while fetching products",
    });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.productid;

  console.log(productId);

  try {
    let form = new formidable.IncomingForm();

    form.keepExtension = true;

    form.parse(req, async (error, fields, file) => {
      if (error) {
        console.log("Error parsing the files");
        return res.status(400).json({
          status: "Fail",
          message: "There was an error parsing the files",
          error: err,
        });
      }

      // console.log(file, fields);

      const { name, description, price, stock, category } = fields;

      if (!name || !description || !price || !stock || !category) {
        return res.status(400).send({
          status: "False",
          error: "Values are not correct , Please correct that.",
        });
      }

      //  TODO == Restriction on field.

      let product = await Product.findById(productId);

      product = _.extend(product, fields);
      console.log("Product=======>>>>>", product);

      // TODO == HANDLE FILE HERE

      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).send({
            error: "file size is too big",
          });
        }

        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;

        product
          .save()
          .then((result) => {
            res.status(200).send({
              status: "success",
              data: result,
              message: "Product is update successfully",
            });
          })
          .catch((error) => {
            return res.status(400).send({
              status: "file is not saving in DB",
              error: error,
            });
          });

        // console.log(product);
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ error, status: "false", message: "Updation failed" });
  }
};


const getprooduct= async(req, res) => {
     
      let id = req.params.productId;

      try {
            const find_data = await Product.findById(id)

            console.log({find_data})

            if(!find_data) {
              res.status(400).send({message: "Error while fetching product " , status: "error"})
            }

            res.status(200).send({message: "data fetch successfully!", data: find_data})
      } catch (error) {
        res.status(400).send({message: "Error while fetching product " , status: error})
      }

}


 const deleteProduct = async(req ,res) =>{

  let id = req.params.productId;

  try {
            await Product.findOneAndDelete(id);

            res.status(200).send({
              status: 'success',
              message: "product delete successfully"
            })


  } catch (error) {

    console.log(error)
    res.status(400).send({message: "Error while deleting product " , status: error})
  }
  

}




module.exports = { createProduct, getAllProducts, updateProduct ,getprooduct ,deleteProduct };
