let { sequelizeCon, Model, DataTypes } = require("../DbConfig/dbConfig");

class Category extends Model {}
// sequelizeCon.sync({ alter: true });
Category.init(
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
      allowNull: true,
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
  },
  {
    tableName: "category",
    modelName: "Category",
    sequelize: sequelizeCon,
  }
);

module.exports = {
  Category,
};
