import { DataSource } from 'typeorm';
import { dbConfig } from './dbConfig.js';

export const AppDataSource = new DataSource(dbConfig);