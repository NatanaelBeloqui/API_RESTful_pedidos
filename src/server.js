import express from 'express';
import { AppDataSource } from './config/database.js';

import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', authRoutes);

// Inicializa a conexão com o banco e inicia o servidor
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
