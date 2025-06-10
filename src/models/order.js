import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Product from './Product.js';
import OrderProduct from './OrderProduct.js';

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'userId',
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders',
  timestamps: false,
});

// Associação N:1 com User
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Order, { foreignKey: 'userId', as: 'userOrders' });

// Associação N:N com Product via OrderProduct
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: 'order_id',
  otherKey: 'product_id',
  as: 'products',
});

export default Order;
