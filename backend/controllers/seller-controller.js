const fs = require("fs");

const Product = require("../models/product-model");
const User = require("../models/user-model");

async function getProducts(req, res, next) {
  const sellerId = req.userData._id;

  let products;

  try {
    products = await Product.findBySellerId(sellerId);
  } catch (error) {
    error.message = "Fetching products failed, please try again later.";
    error.code = 500;

    return next(error);
  }

  if (!products || products.length === 0) {
    const error = new Error(
      "Could not find products for the provided seller id."
    );
    error.code = 404;

    return next(error);
  }

  res.status(200).json({ products: products });
}

async function createNewProduct(req, res, next) {
  const sellerId = req.userData._id;

  const product = new Product({
    ...req.body,
    image: req.file.filename,
    sellerId: sellerId,
  });

  let seller;
  try {
    seller = await User.findById(sellerId);
  } catch (error) {
    error.message = "Creating product failed, please try again.";
    error.code = 500;
    return next(error);
  }

  if (!seller) {
    const error = new Error("Could not find user for provided id.");
    error.code = 404;
    return next(error);
  }

  let createdProductId;

  try {
    const createdProduct = await product.save();
    createdProductId = createdProduct.insertedId.toString();
  } catch (error) {
    error.message = "Creating product failed, please try again.";
    error.code = 500;
    return next(error);
  }

  const createdProduct = await Product.findById(createdProductId);

  res.status(201).json({ product: createdProduct });
}

async function updateProduct(req, res, next) {
  const sellerId = req.userData._id;
  const productId = req.params.id;

  const product = new Product({
    ...req.body,
    _id: productId,
    sellerId: sellerId,
  });

  let existingProduct;
  try {
    existingProduct = await Product.findById(productId);
  } catch (error) {
    error.message = "Something went wrong, could not update product.";
    error.code = 500;

    return next(error);
  }

  if (existingProduct.sellerId.toString() !== sellerId) {
    const error = new Error("You are not allowed to edit this product.");
    error.code = 401;

    return next(error);
  }

  const imagePath = existingProduct.imagePath;

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
  } catch (error) {
    error.message = "Updating product failed, please try again.";
    error.code = 500;
    return next(error);
  }

  fs.unlink(imagePath, function (error) {
    if (error) {
      error.message = "Something went wrong, could not delete product image.";
      error.code = 500;

      return next(error);
    }
  });

  const updatedProduct = await Product.findById(productId);

  res.status(200).json({ product: updatedProduct });
}

async function deleteProduct(req, res, next) {
  const sellerId = req.userData._id;
  const productId = req.params.id;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (error) {
    error.message = "Something went wrong, could not delete product.";
    error.code = 500;
    return next(error);
  }

  if (!product) {
    const error = new Error("Could not find product to delete.");
    error.code = 404;

    return next(error);
  }

  if (product.sellerId !== sellerId) {
    const error = new Error("You are not allowed to delete this product.");
    error.code = 401;

    return next(error);
  }

  const imagePath = product.imagePath;

  try {
    await product.remove();
  } catch (error) {
    error.message = "Something went wrong, could not delete product.";
    error.code = 500;

    return next(error);
  }

  fs.unlink(imagePath, function (error) {
    if (error) {
      error.message = "Something went wrong, could not delete product image.";
      error.code = 500;

      return next(error);
    }
  });

  res.status(200).json({ message: "Deleted product!" });
}

module.exports = {
  getProducts: getProducts,
  createNewProduct: createNewProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
