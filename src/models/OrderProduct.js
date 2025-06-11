import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const OrderProduct = sequelize.define('OrderProduct', {
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
    tableName: 'orders_products',
    timestamps: false,
  });

  return OrderProduct;
};
