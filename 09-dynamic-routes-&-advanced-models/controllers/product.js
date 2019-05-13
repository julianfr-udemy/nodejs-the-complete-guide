const Product = require('../models/product');

exports.get = (req, res, next) => {
  const product = Product.findById(req.params.id);

  res.render(product ? 'product/detail' : 'product/index', { title: 'Products', path: '/products', product });
};

exports.getAdd = (req, res, next) => {
  res.render('product/edit', { title: 'Add Product', path: '/products/add' });
};

exports.getEdit = (req, res, next) => {
  const product = Product.findById(req.params.id);

  res.render('product/edit', { title: 'Edit Product', path: '/products/edit', product });
};

exports.getAdmin = (req, res, next) => {
  products = Product.fetchAll();

  res.render('product/admin', { title: 'Admin Product', path: '/products/admin' });
};

exports.getList = (req, res, next) => {
  products = Product.fetchAll();

  res.render('product/list', { products, title: 'My Shop', path: '/products/list' });
};

exports.getOrders = (req, res, next) => {
  res.render('product/orders', { title: 'My Orders', path: '/products/orders' });
};

exports.post = (req, res, next) => {
  new Product(req.body).save();

  res.redirect('/products/list');
};

exports.put = (req, res, next) => {
  new Product({ id: req.params.id, ...req.body }).save();

  res.redirect('/products/list');
};

exports.delete = (req, res, next) => {
  Product.delete(req.params.id);

  res.redirect('/products/list');
};