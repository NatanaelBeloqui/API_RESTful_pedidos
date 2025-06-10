const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Aqui você vai importar os modelos, por enquanto fica assim:
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exemplo para quando for adicionar models:
// db.User = require('./User')(sequelize, DataTypes);

module.exports = db;
