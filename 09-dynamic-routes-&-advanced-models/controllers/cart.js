const Product = require('../models/product');
const Cart = require('../models/cart');

exports.get = (req, res, next) => {
  const cart = Cart.get();
  const productList = Product.fetchAll();
  const products = [];

  for (product of cart.products) {
    products.push({ ...product, ...productList.find(p => p.id === product.id) });
  }

  res.render('cart/index', { title: 'My Cart', path: '/cart', products });
};

exports.post = (req, res, next) => {
  Cart.add(Product.findById(req.params.product));

  res.redirect("/cart");
};

exports.delete = (req, res, next) => {
  Cart.delete(req.params.id);

  res.redirect("/cart");
};