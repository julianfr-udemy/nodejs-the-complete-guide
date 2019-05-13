const db = require('../services/database');
const Cart = require('./cart');

const TABLE = 'product';
const ID = 'product';

module.exports = class Product {
  constructor({ id, title, image, description, price }) {
    Object.assign(this, { id, title, image, description, price: +price });
  }

  static read(id) {
    const sql = `SELECT * FROM ${TABLE} ${id ? `WHERE ${ID} = ?` : ''}`;
    const values = id ? [id] : null;

    return db.execute(sql, values);
  }

  static create({ title, price, image, description }) {
    const sql = `INSERT INTO ${TABLE} (title, price, image, description) VALUES (?, ?, ?, ?)`;
    const values = [title, price, image, description];

    return db.execute(sql, values);
  }
};