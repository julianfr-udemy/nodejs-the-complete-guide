const { INTEGER, STRING } = require('sequelize');

const db = require('../services/database');

const User = db.define('user', {
  id: { type: INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  name: { type: STRING, allowNull: false },
  email: { type: STRING, allowNull: false }
});

module.exports = User;