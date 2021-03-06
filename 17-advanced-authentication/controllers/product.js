const Product = require('../models/product');

exports.get = async (req, res, next) => {
  try {
    const products = req.user ? await Product.find({ user: req.user._id }) : await Product.find({});

    res.render('product/list', { title: 'Products', path: '/products', products });
  } catch (error) {
    console.log(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.render('product/detail', { title: 'Products', path: '/products', product });
  } catch (error) {
    console.log(error);
  }
};

exports.getAdd = (req, res, next) => {
  res.render('product/edit', { title: 'Add Product', path: '/products/add' });
};

exports.getEdit = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) res.render('product/edit', { title: 'Edit Product', path: '/products/edit', product });
    else res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

exports.getAdmin = async (req, res, next) => {
  try {
    const products = await Product.find({ user: req.user._id });

    res.render('product/admin', { title: 'Admin Product', path: '/products/admin', products });
  } catch (error) {
    console.log(error);
  }
};

// exports.getOrders = (req, res, next) => {
//   res.render('product/orders', { title: 'My Orders', path: '/products/orders' });
// };

exports.post = async (req, res, next) => {
  try {
    const product = new Product({ ...req.body, user: req.user });

    await product.save();

    res.redirect('/products');
  } catch (error) {
    console.log(error);
  }
};

exports.put = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product.user.id.equals(req.user._id)) return res.redirect('/');

    product.set({ ...req.body });

    await product.save();

    res.redirect(`/products/admin`);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Product.deleteOne({ _id: req.params.id, user: req.user._id });

    res.redirect('/products');
  } catch (error) {
    console.log(error);
  }
};