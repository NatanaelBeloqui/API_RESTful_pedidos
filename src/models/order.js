import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { // nome da propriedade em JS
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id', // nome da coluna no banco (snake_case)
    },
  }, {
    tableName: 'orders',
    timestamps: false,
  });

  return Order;
};
