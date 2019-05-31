const { INTEGER } = require('sequelize');

const db = require('../services/database');

const Order = db.define('order', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, }
});

module.exports = Order;