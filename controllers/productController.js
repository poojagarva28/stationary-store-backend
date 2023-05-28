const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const fs = require("fs");

//@desc Get all products
//@route GET /api/products
//@access private
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    user_id: req.user.id,
  });
  res.status(200).json(products);
});

//@desc create products
//@route POST /api/products
//@access private
const createProduct = asyncHandler(async (req, res) => {
  // console.log(req.file.filename, "multer file")
  // console.log("The body of the request", req.body);
  const productImage = req.file.filename;
  const { name, description, price, category, quantity, attributes } = req.body;
  console.log(
    name,
    description,
    price,
    category,
    quantity,
    attributes,
    "requested data"
  );
  if (
    !name ||
    !description ||
    !price ||
    !category ||
    !quantity ||
    !productImage ||
    !attributes
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const product = await Product.create({
    name,
    description,
    price,
    category,
    quantity,
    attributes,
    image: productImage,
    user_id: req.user.id,
  });
  res.status(200).json(product);
});

//@desc get product
//@route GET /api/products/:id
//@access private
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("No product found");
  }
  res.status(200).json(product);
});

//@desc update product
//@route PUT /api/products/:id
//@access private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("No product found");
  }

  if (product.user_id.toString() != req.user.id) {
    res.status(401);
    throw new Error("user dont have permission to update other user product");
  }

  const productImage = req.file.filename;
  const { name, description, price, category, quantity, attributes } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !category ||
    !quantity ||
    !productImage ||
    !attributes
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const productDir = __dirname.replace(
    "controllers",
    `uploads/${product.image}`
  );
  fs.unlink(productDir, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      category,
      quantity,
      attributes,
      image: productImage,
    },
    {
      new: true,
    }
  );
  console.log(updatedProduct, "updatedProduct");
  res.status(200).json(updatedProduct);
});

//@desc Delete product
//@route GET /api/products/:id
//@access private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("No product found");
  }

  if (product.user_id.toString() != req.user.id) {
    res.status(401);
    throw new Error("user dont have permission to update other user product");
  }

  const productImage = __dirname.replace(
    "controllers",
    `uploads/${product.image}`
  );
  fs.unlink(productImage, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
  const deletedProduct = await Product.deleteOne({ _id: product._id });

  res
    .status(200)
    .json(deletedProduct, { message: "Product deleted successfully" });
});

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
