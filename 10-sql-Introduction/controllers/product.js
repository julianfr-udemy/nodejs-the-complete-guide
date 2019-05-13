const Product = require('../models/product');

exports.get = async (req, res, next) => {
  try {
    const products = (await Product.read())[0];

    res.render('product/list', { title: 'Products', path: '/products', products });
  } catch (error) {
    console.log(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const product = (await Product.read(req.params.product))[0];

    res.render('product/detail', { title: 'Products', path: '/products', product: product[0] });
  } catch (error) {
    console.log(error);
  }
};

exports.getAdd = (req, res, next) => {
  res.render('product/edit', { title: 'Add Product', path: '/products/add' });
};

exports.getEdit = async (req, res, next) => {
  try {
    const product = (await Product.read(req.params.product))[0];

    res.render('product/edit', { title: 'Edit Product', path: '/products/edit', product: product[0] });
  } catch (error) {
    console.log(error);
  }
};

exports.getAdmin = async (req, res, next) => {
  try {
    const products = (await Product.read())[0];

    res.render('product/admin', { title: 'Admin Product', path: '/products/admin', products });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrders = (req, res, next) => {
  res.render('product/orders', { title: 'My Orders', path: '/products/orders' });
};

exports.post = async (req, res, next) => {
  try {
    await Product.create(req.body);

    res.redirect('/products/list');
  } catch (error) {
    console.log(error);
  }

};

exports.put = (req, res, next) => {
  new Product({ id: req.params.id, ...req.body }).save();

  res.redirect('/products/list');
};

exports.delete = (req, res, next) => {
  Product.delete(req.params.id);

  res.redirect('/products/list');
};