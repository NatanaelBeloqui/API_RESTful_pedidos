require('dotenv').config();

const dbConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
//   entities: [/* aqui as suas entidades, ex: 'src/models/*.js' */],
  synchronize: true,
};