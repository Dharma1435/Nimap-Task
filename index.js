const express = require("express");
const app = express();
const path = require("path");
const product = require("./Routes/productRoutes");
const category = require("./Routes/CategoryRoutes");
const cors = require("cors");
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/product", product);
app.use("/category", category);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("For brower Product:-http://localhost:3000/product/productMaster")
  console.log("for brower Category:-http://localhost:3000/category/categoryMaster")
});
