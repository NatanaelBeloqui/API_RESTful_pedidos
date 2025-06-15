import Sequelize from 'sequelize';
import dotenv from 'dotenv';

import UserModel from './user.js';
import CategoryModel from './category.js';
import ProductModel from './product.js';
import OrderModel from './order.js';
import OrderProductModel from './orderProduct.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Inicializa os models
const User = UserModel(sequelize);
const Category = CategoryModel(sequelize);
const Product = ProductModel(sequelize);
const Order = OrderModel(sequelize);
const OrderProduct = OrderProductModel(sequelize);

// Associações
User.hasMany(Order, { foreignKey: 'user_id', as: 'userOrders' });  // aqui também snake_case
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: 'order_id',
  otherKey: 'product_id',
  as: 'products',
});
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: 'product_id',
  otherKey: 'order_id',
  as: 'orders',
});

export {
  sequelize,
  User,
  Category,
  Product,
  Order,
  OrderProduct,
};
