const mongoose = require('mongoose');
const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.get = async (req, res, next) => {
  try {
    const products = req.user ? await Product.find({ user: req.user._id }) : await Product.find({});

    res.render('product/list', { title: 'Products', path: '/products', products });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.render('product/detail', { title: 'Products', path: '/products', product });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};

exports.getAdd = (req, res, next) => {
  res.render('product/edit', { title: 'Add Product', path: '/products/add', validationErrors: [] });
};

exports.getEdit = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) res.render('product/edit', { title: 'Edit Product', path: '/products/edit', product, edit: true, validationErrors: [] });
    else res.redirect('/');
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};

exports.getAdmin = async (req, res, next) => {
  try {
    const products = await Product.find({ user: req.user._id });

    res.render('product/admin', { title: 'Admin Product', path: '/products/admin', products });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};

// exports.getOrders = (req, res, next) => {
//   res.render('product/orders', { title: 'My Orders', path: '/products/orders' });
// };

exports.post = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const product = new Product({ ...req.body, user: req.user });

    //product._id = new mongoose.Types.ObjectId("5cfe9a3b8c374e13a8a4eb36");

    if (!errors.isEmpty()) {
      return res.status(204).render('product/edit', {
        title: 'Add Product',
        path: '/products/add',
        error: errors.array()[0].msg,
        product: { ...product._doc },
        validationErrors: errors.array()
      });
    }

    await product.save();

    res.redirect('/products');
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};

exports.put = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const product = await Product.findById(req.params.id);

    if (!errors.isEmpty()) {
      return res.status(422).render('product/edit', {
        title: 'Edit Product',
        path: '/products/edit',
        error: errors.array()[0].msg,
        product: { ...product._doc },
        validationErrors: errors.array(),
        edit: true
      });
    }

    if (!product.user.id.equals(req.user._id)) return res.redirect('/');

    product.set({ ...req.body });

    await product.save();

    res.redirect(`/products/admin`);
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Product.deleteOne({ _id: req.params.id, user: req.user._id });

    res.redirect('/products');
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};