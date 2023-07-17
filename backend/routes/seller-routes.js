const express = require("express");

const sellerController = require("../controllers/seller-controller");
const imageUploadMiddleware = require("../middlewares/image-upload");
const checkAuthStatusMiddleware = require('../middlewares/check-auth');

const router = express.Router();

router.use(checkAuthStatusMiddleware);

router.get("/products", sellerController.getProducts);

router.post(
  "/products",
  imageUploadMiddleware,
  sellerController.createNewProduct
);

router.post(
  "/products/:id",
  imageUploadMiddleware,
  sellerController.updateProduct
);

router.delete("/products/:id", sellerController.deleteProduct);

module.exports = router;
