const { INTEGER } = require('sequelize');

const db = require('../services/database');

const Cart = db.define('cart', {
  id: { type: INTEGER, autoIncrement: true, allowNull: false, primaryKey: true }
});

module.exports = Cart;