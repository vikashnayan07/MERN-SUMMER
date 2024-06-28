const productModel = require("../models/productModels");

const checkId = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      res.status(400).json({ status: "Failed", msg: "Invalid product Id" });
    }
  } catch (error) {
    if (error.name === "CasteError") {
      console.log(error);
      res.status(404).json({
        status: "Error",
        msg: error.message,
      });
      return;
    }

    res.status(500).json({
      status: "Fail",
      msg: "Internal server Error",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const product = await productModel.find({});
    res.status(200).send({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }

  // const products = productsCollection.find().toArray();
  // res.send({ status: "succes", product: products });
};

const createProduct = async (req, res) => {
  try {
    const body = req.body;
    // if (!body.firstName || !body.lastName || body.email) {
    //   res.status(400).send({ status: "Error", msg: "Mandatary fill" });
    // }
    console.log(body);
    const newProduct = await productModel.create(body);
    res.json({ status: "succes", data: { product: newProduct } });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "fail", msg: "internal server error", info: err });
  }
};

const replacedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const newProduct = await productModel.findOneAndReplace({ _id: id }, body, {
      new: true,
    });
    res.status(201).json({ status: "success", data: { product: newProduct } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed", msg: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await productModel.findOneAndDelete(
      { _id: id },
      {
        new: true,
      }
    );
    res.status(201).json({
      status: "Deleted Successfully",
      data: { product: deleteProduct },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed", msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const update = await productModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.status(200).json({
      status: "Successfully Updated",
      data: {
        product: update,
      },
    });
  } catch (error) {
    console.log(error);
    res.status.json({
      status: "Failed",
      msg: error.message,
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  replacedProduct,
  checkId,
  deleteProduct,
  updateProduct,
};
