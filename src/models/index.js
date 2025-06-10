import sequelize from '../config/database.js';

import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';
import Order from './Order.js';
import OrderProduct from './OrderProduct.js';

// Definindo associações (se ainda não definidas dentro dos models)
User.hasMany(Order, { foreignKey: 'userId', as: 'userOrders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

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
