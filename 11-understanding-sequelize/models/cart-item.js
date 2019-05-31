const { INTEGER } = require('sequelize');

const db = require('../services/database');

const CartItem = db.define('cart_item', {
  id: { type: INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  quantity: { type: INTEGER, allowNull: false }
})

module.exports = CartItem;