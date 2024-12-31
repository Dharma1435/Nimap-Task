const express = require("express");
const router = express.Router();
const {
  createProductController,
  getProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  productUI,
  getProductMasterPage,
} = require("../Controller/productController");

router.post("/createProduct", createProductController);
router.get("/productMaster", getProductController);
router.get("/getProductById/:id", getProductByIdController);
router.put("/updateProduct/:id", updateProductController);
router.delete("/deleteProduct/:id", deleteProductController);

router.get('/createProduct',productUI)
router.get('/productMaster', getProductMasterPage);  // This should work



module.exports = router;
