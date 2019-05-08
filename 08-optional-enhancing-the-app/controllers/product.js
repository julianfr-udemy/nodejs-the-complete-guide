const Product = require('../models/product');

exports.get = exports.getAdd = (req, res, next) => {
  res.render('product/index', { title: 'Products', path: '/products' });
};

exports.getAdd = (req, res, next) => {
  res.render('product/add', { title: 'Add Product', path: '/products/add' });
};

exports.postAdd = (req, res, next) => {
  new Product(req.body).save();

  res.redirect('/products/');
};

exports.getAdmin = (req, res, next) => {
  res.render('product/admin', { title: 'Admin Product', path: '/products/admin' });
};

exports.getList = (req, res, next) => {
  products = Product.fetchAll();

  res.render('product/list', { products, title: 'My Shop', path: '/products/list' });
};

exports.getCart = (req, res, next) => {
  res.render('cart', { title: 'My Cart', path: '/products/cart' });
};

exports.getOrders = (req, res, next) => {
  res.render('product/orders', { title: 'My Orders', path: '/products/orders' });
};