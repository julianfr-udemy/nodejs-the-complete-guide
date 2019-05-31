const Sequelize = require('sequelize');
const db = new Sequelize('node-complete', 'root', 'root', { dialect: 'mysql', host: 'localhost' });

module.exports = db;