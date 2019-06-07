const { ObjectId } = require('mongodb');
const db = require('../services/database');

const products = () => db.connection().collection('product')

class Product {
  constructor({ _id, title, price, image, description, user }) {
    const id = _id ? new ObjectId(_id) : null;
    Object.assign(this, { _id: id, title, price, image, description, user });
  }

  static async fetchAll() {
    return await products().find().toArray();
  }

  static async findById(id) {
    return await products().find({ _id: ObjectId(id) }).next();
  }

  async save() {
    await this._id
      ? products().updateOne({ _id: this._id }, { $set: this })
      : products().insertOne(this);
  }

  static async delete(id) {
    await products().deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = Product;