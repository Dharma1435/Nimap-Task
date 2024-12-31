const express = require("express");
const router = express.Router();
const {
  createCategoryController,
  getCategoryByIdController,
  getAllCategoryController,
  getCategoryMasterPage,
  categoryUI,
  deleteCategoryController,
  updateCategoryController,
} = require("../Controller/categoryController");

router.post("/createCategory", createCategoryController);
router.get("/categoryMaster", getAllCategoryController);
router.get("/getCategoryById/:id", getCategoryByIdController);
router.put("/updateCategory/:id", updateCategoryController);
router.delete("/deleteCategory/:id", deleteCategoryController);

router.get("/category", getCategoryMasterPage);
router.get("/createCategory", categoryUI);

module.exports = router;
