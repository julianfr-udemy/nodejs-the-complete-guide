const { INTEGER, DOUBLE, STRING } = require('sequelize');

const db = require('../services/database');

const Product = db.define('product', {
  id: { type: INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  title: { type: STRING, allowNull: false },
  price: { type: DOUBLE, allowNull: false },
  image: { type: STRING, allowNull: false },
  description: { type: STRING, allowNull: false }
});

module.exports = Product;