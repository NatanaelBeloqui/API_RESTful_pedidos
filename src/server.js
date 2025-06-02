import express from 'express';
import { AppDataSource } from './config/data-source.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Inicializa a conexão com o banco e inicia o servidor
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Banco de dados conectado com sucesso!');
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });
