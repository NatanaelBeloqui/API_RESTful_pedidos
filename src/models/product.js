import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Category from './category.js';
import Order from './order.js';
import OrderProduct from './orderProduct.js';

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
    allowNull: true,
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

Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: 'product_id',
  otherKey: 'order_id',
  as: 'orders',
});

export default Product;
