const {
  createCategoryService,
  getCategoryService,
  getCategoryByIdService,
  deleteCategoryService,
  updateCategoryService,
} = require("../Service/categoryService");

const createCategoryController = async (req, res) => {
  try {
    const { code, response } = await createCategoryService(req.body);
    if (code === 201) {
      return res.redirect("/category/categoryMaster"); 
    } else {
      return res.status(code).json(response); 
    }
  } catch (error) {
    console.log(error);
    return res.status(501).json("iqwq");
  }
};

async function categoryUI(req, res) {
  return res.render("category/add");
}

const getAllCategoryController = async (req, res) => {
  try {
    const { code, response } = await getCategoryService(req);
    let categories = response.data;
    if (code === 200) {
      return res.render("category/categoryMaster", { categories }); 
    } else {
      return res.status(code).json(response); 
    }
  } catch (error) {
    console.log(error);
    return res.status(code).json(response);
  }
};

const getCategoryMasterPage = (req, res) => {
  res.render("categoryMaster");
};

const getCategoryByIdController = async (req, res) => {
  try {
    const { code, response } = await getCategoryByIdService(req.params.id);
    return res.status(code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(code).json(response);
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { code, response } = await updateCategoryService(
      req.params.id,
      req.body
    );
    return res.status(code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(code).json(response);
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    console.log(req.params)
    console.log("Asa")
    const { code, response } = await deleteCategoryService(req.params.id);
    if (code === 200) {
        return res.status(200).json({ redirectUrl: "/category/categoryMaster" });
    } else {
      return res.status(code).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(code).json(response);
  }
};

module.exports = {
  createCategoryController,
  getCategoryByIdController,
  deleteCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getCategoryMasterPage,
  categoryUI,
};
