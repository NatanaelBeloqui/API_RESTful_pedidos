# API RESTful Pedidos

## Descrição

API para gerenciamento de pedidos, produtos, categorias e usuários.  
Permite cadastro e autenticação de usuários, CRUD completo para produtos, categorias e pedidos, com controle de acesso via JWT.

## Tecnologias

- Node.js  
- Express.js  
- Sequelize (ORM)  
- MySQL  
- JSON Web Token (JWT)  
- Swagger (documentação)  

## Instalação

1. Clone o repositório:

  ```bash
  git clone <url-do-repositorio>
  cd api_restful_pedidos

2. Instale as dependências:

  npm install

3. Configure as variáveis de ambiente no arquivo .env:
  PORT=3000
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=seu_usuario
  DB_PASSWORD=sua_senha
  DB_NAME=api_restful_pedidos
  JWT_SECRET=sua_chave_secreta
  JWT_EXPIRES_IN=1d

4. Execute as migrations (se houver):

  npx sequelize-cli db:migrate

5. Inicie a aplicação:

  npm start

