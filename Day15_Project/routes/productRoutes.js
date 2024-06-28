const express = require("express");
const {
  getProducts,
  createProduct,
  replacedProduct,
  deleteProduct,
  checkId,
  updateProduct,
} = require("../controllers/productControllers.js");
const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(createProduct);
productRouter
  .route("/:id")
  .put(checkId, replacedProduct)
  .delete(deleteProduct)
  .patch(updateProduct);

module.exports = productRouter;
