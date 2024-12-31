const { Category } = require("../Model/categoryModel");
const { Product } = require("../Model/productModel");

const createCategoryService = async (data) => {
  console.log({ data });
  try {
    const createCategory = await Category.create({
      name: data.name,
      description: data.description,
    });
    if (!createCategory) {
      return {
        code: 500,
        response: { msg: "Category not created" },
      };
    }
    return {
      code: 201,
      response: { msg: "Category created successfully", data: createCategory },
    };
  } catch (error) {
    console.log({ error });
    return {
      code: 500,
      response: { msg: "Internal Server Error" },
    };
  }
};

const getCategoryService = async () => {
  try {
    const getCategory = await Category.findAll();
    if (!getCategory) {
      return {
        code: 404,
        response: { msg: "Category not found" },
      };
    }
    return {
      code: 200,
      response: { msg: "Category fetch successfully", data: getCategory },
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      response: { msg: "Internal Server Error" },
    };
  }
};

const getCategoryByIdService = async (id) => {
  try {
    const getCategoryById = await Category.findOne({
      where: { id },
      raw: true,
    });
    if (!getCategoryById) {
      return {
        code: 404,
        response: { msg: "Category not found" },
      };
    }
    return {
      code: 200,
      response: { msg: "Category fetch successfully", data: getCategoryById },
    };
  } catch (error) {
    return {
      code: 500,
      response: { msg: "Internal Server Error" },
    };
  }
};

const updateCategoryService = async (id, data) => {
  try {
    const updateCategory = await Category.update(data, { where: { id } });
    if (!updateCategory) {
      return {
        code: 404,
        response: { msg: "Category not found" },
      };
    }
    return {
      code: 200,
      response: { msg: "Category updated successfully" },
    };
  } catch (error) {
    return {
      code: 500,
      response: { msg: "Internal Server Error" },
    };
  }
};

const deleteCategoryService = async (id) => {
  console.log(id);
  try {
    await Product.update({ categoryId: null }, { where: { categoryId: id } });

    const deleteCategory = await Category.destroy({ where: { id: id } });
    console.log({ deleteCategory });
    if (!deleteCategory) {
      return {
        code: 404,
        response: { msg: "Category not found" },
      };
    }
    return {
      code: 200,
      response: { msg: "Category deleted successfully" },
    };
  } catch (error) {
    console.log({ error });
    return {
      code: 500,
      response: { msg: "Internal Server Error" },
    };
  }
};
module.exports = {
  createCategoryService,
  getCategoryService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
};
