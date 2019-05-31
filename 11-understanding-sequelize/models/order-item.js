const { INTEGER } = require('sequelize');

const db = require('../services/database');

const Order = db.define('order_item', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, },
  quantity: { type: INTEGER, allowNull: false }
});

module.exports = Order;