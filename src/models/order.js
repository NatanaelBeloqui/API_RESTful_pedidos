import { EntitySchema } from 'typeorm';

export const Order = new EntitySchema({
  name: 'Order',
  tableName: 'orders',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'userId' },
      eager: true,
    },
    products: {
      type: 'many-to-many',
      target: 'Product',
      joinTable: {
        name: 'order_products',
        joinColumn: { name: 'orderId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
      },
      eager: true,
    },
  },
});
