import sequelize from '../config/database.js';

import User from './user.js';
import Category from './category.js';
import Product from './product.js';
import Order from './order.js';
import OrderProduct from './orderProduct.js';

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
