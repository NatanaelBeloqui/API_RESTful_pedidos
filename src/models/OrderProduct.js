import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'id',
      },
      field: 'order_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id',
      },
      field: 'product_id',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    tableName: 'orders_products',
    timestamps: false,
  });

  return OrderProduct;
};
