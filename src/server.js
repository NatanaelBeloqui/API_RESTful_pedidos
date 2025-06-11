import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './docs/swagger.js';
import sequelize from './config/database.js';
import router from './routes/index.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

// sequelize.sync()
//   .then(() => console.log('Modelos sincronizados com o banco de dados.'))
//   .catch(err => console.error('Erro ao sincronizar modelos:', err));

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
