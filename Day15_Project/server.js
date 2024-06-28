const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const productRouter = require("./routes/productRoutes.js");

require("./config/db.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/products", productRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
