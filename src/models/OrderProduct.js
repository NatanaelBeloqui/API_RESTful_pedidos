import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class OrderProduct extends Model {}

OrderProduct.init({
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'orders',
      key: 'id',
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'products',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'OrderProduct',
  tableName: 'orders_products',
  timestamps: false,
});

export default OrderProduct;
