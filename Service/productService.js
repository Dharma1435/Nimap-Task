const { Category } = require("../Model/categoryModel");
const { Product } = require("../Model/productModel");

const createProduct = async (data) => {
  console.log(data);
  try {
    const categoryExists = await Category.findByPk(data.categoryId);

    if (!categoryExists) {
      return {
        code: 400,
        response: {
          msg: "Invalid categoryId. Category does not exist. Please provide proper CategoryId that exist in Database",
        },
      };
    }
    const product = await Product.create({
      name: data.name,
      price: data.price,
      description: data.description,
      categoryId: data.categoryId,
    });
    if (!product) {
      return {
        code: 500,
        response: { msg: "Product not created" },
      };
    }
    return {
      code: 201,
      response: { msg: "Product created successfully", data: product },
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      response: { msg: "Internal Server Error" },
    };
  }
};

const getProductService = async (data) => {
  const { page, limit } = data;
  try {
    console.log("come");
    const offset = (page - 1) * limit;
    const getProduct = await Product.findAll({
      offset,
      limit,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    if (getProduct.length === 0) {
      return {
        code: 404,
        response: { msg: "Product not found" },
      };
    }

    const totalProducts = await Product.count();
    const totalPages = Math.ceil(totalProducts / limit);
    const currentPage = page;
    console.log("asasa", totalPages, totalProducts);
    return {
      code: 200,
      response: {
        msg: "Products fetched successfully",
        data: getProduct.map((product) => ({
          ...product.toJSON(),
          categoryId: product.categoryId,
          categoryName: product.category ? product.category.name : null,
        })),
        currentPage,
        totalProducts,
        totalPages,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      response: { msg: "Internal Server Error" },
    };
  }
};

const getProductByIdService = async (id) => {
  try {
    const getProductById = await Product.findOne({ where: { id }, raw: true });
    if (!getProductById) {
      return {
        code: 404,
        response: { msg: "Product not found" },
      };
    }
    return {
      code: 200,
      response: { msg: "Product fetch successfully", data: getProductById },
    };
  } catch (error) {
    return {
      code: 500,
      response: { msg: "Internal Server Error" },
    };
  }
};

const updateProductService = async (id, data) => {
  try {
    const updateProduct = await Product.update(
      {
        name: data.name,
        price: data.price,
        description: data.description,
      },
      { where: { id } }
    );
    if (!updateProduct) {
      return {
        code: 404,
        response: { msg: "Product not found" },
      };
    }
    return {
      code: 200,
      response: { msg: "Product updated successfully" },
    };
  } catch (error) {
    return {
      code: 500,
      response: { msg: "Internal Server Error" },
    };
  }
};

const deleteProductService = async (id) => {
  try {
    const deleteProduct = await Product.destroy({ where: { id } });
    if (!deleteProduct) {
      return {
        code: 404,
        response: { msg: "Product not found" },
      };
    }
    return {
      code: 200,
      response: { msg: "Product deleted successfully" },
    };
  } catch (error) {
    return {
      code: 500,
      response: { msg: "Internal Server Error" },
    };
  }
};
module.exports = {
  createProduct,
  getProductService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};
