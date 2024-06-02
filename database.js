const { Sequelize } = require('sequelize');

console.log('Initializing Sequelize...');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './amatdadb.db',
    logging: console.log
});

console.log('Sequelize initialized');

module.exports = sequelize;