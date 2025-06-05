import express from 'express';
import { AppDataSource } from './config/database.js';

import routes from './routes/index.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rotas
app.use('/api', routes); // apenas rota raiz opcional
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes); // <- isso garante /api/auth/register e /api/auth/login

// Inicializa banco + servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado com sucesso!');
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });