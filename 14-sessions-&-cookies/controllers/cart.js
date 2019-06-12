const Product = require('../models/product');

exports.get = async (req, res, next) => {
  try {
    const user = await req.user.populate('cart.products._id').execPopulate();

    res.render('cart/index', { title: 'My Cart', path: '/cart', products: user.cart.products, isLoggedIn: req.user });
  } catch (error) {
    console.log(error);
  }
};

exports.post = async (req, res, next) => {
  try {
    product = await Product.findById(req.params.product);

    req.user.addToCart(product);

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await req.user.deleteFromCart(req.params.product)

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};