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
  git clone <https://github.com/NatanaelBeloqui/API_RESTful_pedidos.git>
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


# Endpoints Principais

## Usuários
- POST /users/register - Registro de novo usuário
- POST /users/login - Login e obtenção de token JWT
- GET /users/me - Dados do usuário autenticado
- PUT /users/me - Atualização dos dados do usuário autenticado
- PUT /users/me/password - Alteração de senha do usuário autenticado
- DELETE /users/me - Exclusão da conta do usuário autenticado

## Categorias
- GET /categories - Listar todas as categorias
- POST /categories - Criar nova categoria (autenticado)
- GET /categories/{id} - Obter categoria por ID
- PUT /categories/{id} - Atualizar categoria (autenticado)
- DELETE /categories/{id} - Excluir categoria (autenticado)

## Produtos
- GET /products - Listar todos os produtos
- POST /products - Criar novo produto (autenticado)
- GET /products/{id} - Obter produto por ID
- PUT /products/{id} - Atualizar produto (autenticado)
- DELETE /products/{id} - Excluir produto (autenticado)

## Pedidos
- POST /orders - Criar novo pedido (autenticado)
- GET /orders - Listar pedidos do usuário autenticado
- GET /orders/{id} - Obter pedido por ID (autenticado)
- DELETE /orders/{id} - Cancelar pedido (autenticado)

## Autenticação
- A API utiliza JWT para autenticação. Após o login, o token deve ser enviado no header das requisições protegidas:

Authorization: Bearer <token>

## Documentação
- A documentação completa dos endpoints está disponível via Swagger. Após iniciar a aplicação, acesse:

http://localhost:<PORT>/api-docs
Lá é possível visualizar e testar todos os endpoints da API.
