import express from "express";
import { AppDataSource } from "./src/config/data-source.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Conectar ao banco
AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");

    // Iniciar servidor
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
