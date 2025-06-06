import express from 'express';
import { AppDataSource } from './config/database.js';
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

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
