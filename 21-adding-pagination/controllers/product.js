const path = require('path');

const Product = require('../models/product');
const { deleteFile } = require('../util/file');

const { validationResult } = require('express-validator');

const ITEMS_PER_PAGE = 1;

exports.get = async (req, res, next) => {
  try {
    const quantity = await Product.find().countDocuments();
    const page = +req.query.page || 1;

    const pagination = {
      page,
      hasNextPage: ITEMS_PER_PAGE * page < quantity,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(quantity / ITEMS_PER_PAGE)
    };

    const products = await Product.find(req.user ? { user: req.user._id } : {})
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.render('product/list', { title: 'Products', path: '/products', products, pagination });
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

    //product._id = new mongoose.Types.ObjectId("5cfe9a3b8c374e13a8a4eb36");

    if (!req.file) {
      return res.status(422).render('product/edit', {
        title: 'Add Product',
        path: '/products/add',
        error: 'Attached file is not an image',
        product: { ...product._doc },
        validationErrors: errors.array()
      });
    }

    const image = path.basename(req.file.path);

    const product = new Product({ ...req.body, user: req.user, image });

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

    //if (!product.user.id.equals(req.user._id)) return res.redirect('/');

    if (req.file) {
      deleteFile(path.join(__dirname, '..', 'public', 'images', product.image));
      req.body.image = path.basename(req.file.path);
    }

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
    const product = await Product.findById(req.params.id);

    if (!product) throw new Error("Product not found!");

    deleteFile(product.image);
    await Product.deleteOne({ _id: req.params.id, user: req.user._id });


    res.redirect('/products');
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};