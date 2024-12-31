const {
  createProduct,
  getProductService,
  getProductByIdService,
  deleteProductService,
  updateProductService,
} = require("../Service/productService");

const createProductController = async (req, res) => {
  try {
    const { code, response } = await createProduct(req.body);
    if (code === 201) {
      return res.redirect("/product/productMaster");
    } else {
      return res.status(code).json(response);
    }
    // return res.status(code).json(response);
  } catch (error) {
    return res.status(code).json(response);
  }
};

async function productUI(req, res) {
  return res.render("product/add");
}

const getProductController = async (req, res) => {
  try {
    const page = req.query.page || 1;

    const limit = parseInt(req.query.limit) || 10;
    const { code, response } = await getProductService({ page, limit });

    console.log({ response });
    if (code === 200) {
      let products = response.data;
      let totalProducts = response.totalProducts;
      let totalPages = response.totalPages;
      let currentPage= response.currentPages;
      if (Array.isArray(products)) {
        console.log("41");
        return res.render("product/productMaster", {
          products,
          totalPages,
          totalProducts,
          currentPage,
        });
      } else {
        console.log("#!");
        return res.status(500).json({ msg: "Unexpected data format" });
      }
    } else {
      return res.status(code).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(code).json(response);
  }
};

const getProductMasterPage = (req, res) => {
  res.render("productMaster");
};

const getProductByIdController = async (req, res) => {
  try {
    const { code, response } = await getProductByIdService(req.params.id);
    return res.status(code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(code).json(response);
  }
};

const updateProductController = async (req, res) => {
  try {
    const { code, response } = await updateProductService(
      req.params.id,
      req.body
    );
    return res.status(code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(code).json(response);
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { code, response } = await deleteProductService(req.params.id);
    return res.status(code).json(response);
  } catch (error) {
    console.log(error);
    return res.status(code).json(response);
  }
};
module.exports = {
  createProductController,
  getProductByIdController,
  deleteProductController,
  updateProductController,
  getProductController,
  productUI,
  getProductMasterPage,
};
