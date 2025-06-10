import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import sequelize from './config/database.js'; // note o '.js'

app.use(express.json());

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

sequelize.sync()
  .then(() => console.log('Modelos sincronizados com o banco de dados.'))
  .catch(err => console.error('Erro ao sincronizar modelos:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
