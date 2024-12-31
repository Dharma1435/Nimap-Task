let { sequelizeCon, Model, DataTypes } = require("../DbConfig/dbConfig");

const { Category } = require("./categoryModel");
class Product extends Model {}
// sequelizeCon.sync({ alter: true });
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    is_Deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    tableName: "product",
    modelName: "Product",
    sequelize: sequelizeCon,
  }
);

Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });

module.exports = {
  Product,
};
