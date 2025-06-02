import { User } from '../models/user.js';
import { Category } from '../models/category.js';
import { Product } from '../models/product.js';
import { Order } from '../models/order.js';

export const dbConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User, Category, Product, Order],
};
