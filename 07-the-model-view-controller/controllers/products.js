const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    title: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  new Product(req.body.title).save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  products = Product.fetchAll();

  res.render('shop', {
    products,
    title: 'My Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
}