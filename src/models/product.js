import { EntitySchema } from 'typeorm';
import { Category } from './category.js';

export const Product = new EntitySchema({
  name: 'Product',
  tableName: 'products',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    price: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
  },
  relations: {
    category: {
      type: 'many-to-one',
      target: 'Category',
      joinColumn: { name: 'categoryId' },
      eager: true,
    },
  },
});
