const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  pizza_name: String,
  pizza_category: String,
  pizza_size: String,
  pizza_price: String,
});

const productModel = mongoose.model("Pizza", userSchema);
module.exports = productModel;
