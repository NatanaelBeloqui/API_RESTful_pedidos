import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Category from './Category.js';
import Order from './Order.js';
import OrderProduct from './OrderProduct.js';

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Permite NULL conforme ON DELETE SET NULL no banco
    references: {
      model: 'categories',
      key: 'id',
    },
    field: 'categoryId',
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: false,
});

// Associação 1:N com Category
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

// Associação N:N com Order via OrderProduct
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: 'product_id',
  otherKey: 'order_id',
  as: 'orders',
});

export default Product;
