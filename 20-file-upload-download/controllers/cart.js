const Product = require('../models/product');

exports.get = async (req, res, next) => {
  try {
    const user = await req.user.populate('cart.products._id').execPopulate();

    res.render('cart/index', { title: 'My Cart', path: '/cart', products: user.cart.products });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};

exports.post = async (req, res, next) => {
  try {
    product = await Product.findById(req.params.product);

    req.user.addToCart(product);

    res.redirect("/cart");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await req.user.deleteFromCart(req.params.product)

    res.redirect("/cart");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};