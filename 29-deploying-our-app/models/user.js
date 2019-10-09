const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = require('./order');

const User = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  reset: {
    token: String,
    expiration: Date,
  },
  cart: {
    products: [{
      _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }]
  }
})

User.methods.addToCart = async function (product) {
  const productOnCart = this.cart.products.find(p => p._id.equals(product._id));

  if (productOnCart) productOnCart.quantity += 1;
  else this.cart.products.push({ _id: product._id, quantity: 1 });

  await this.save();
}

User.methods.getCart = async function () {
  await this.populate('cart.products._id').execPopulate();
}

User.methods.deleteFromCart = async function (product) {
  this.cart.products = this.cart.products.filter(p => !p._id.equals(product));

  await this.save();
}

User.methods.addOrder = async function () {
  await this.getCart();

  const products = this.cart.products.map(p => ({ quantity: p.quantity, product: { ...p._id._doc } }));

  const order = new Order({ products, user: { _id: this._id } });

  await order.save();

  this.cart = { products: [] };

  await this.save();
}

module.exports = mongoose.model('User', User);