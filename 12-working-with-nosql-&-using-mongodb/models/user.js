const { ObjectId } = require('mongodb');
const db = require('../services/database');

const users = () => db.connection().collection('user');

class User {
  constructor({ _id, name, email, cart = { products: [] } }) {
    const id = _id ? ObjectId(_id) : null;

    Object.assign(this, { _id: id, name, email, cart });
  }

  async save() {
    try {
      await users().insertOne(this);
    } catch (error) {
      next(error);
    }
  }

  async getCart() {
    const cartProducts = this.cart.products.map(p => p._id);
    const products = await db.connection().collection('product').find({ _id: { $in: cartProducts } }).toArray();

    return products.map(p => ({ ...p, quantity: this.cart.products.find(cp => cp._id.equals(p._id)).quantity }));
  }

  async addOrder() {
    const products = await this.getCart();

    const order = { products, user: { _id: this._id, name: this.name } };

    await db.connection().collection('order').insertOne(order);

    this.cart = { products: [] };
    await users().updateOne({ _id: this._id }, { $set: { cart: this.cart } });
  }

  async getOrders() {
    return await db.connection().collection('order').find({ 'user._id': this._id }).toArray();
  }

  async addToCart(product) {
    const productOnCart = this.cart.products.find(p => p._id.equals(product._id));

    if (productOnCart) productOnCart.quantity += 1;
    else this.cart.products.push({ _id: product._id, quantity: 1 });

    await users().updateOne({ _id: this._id }, { $set: { cart: this.cart } });
  }

  async deleteFromCart(product) {
    this.cart.products = this.cart.products.filter(p => !p._id.equals(product));

    await users().updateOne({ _id: this._id }, { $set: { cart: this.cart } });
  }

  static async findById(id) {
    try {
      return await users().findOne({ _id: ObjectId(id) });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = User;