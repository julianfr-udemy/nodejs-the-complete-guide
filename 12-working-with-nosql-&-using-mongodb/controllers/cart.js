const Product = require('../models/product');

exports.get = async (req, res, next) => {
  try {
    const products = await req.user.getCart();

    res.render('cart/index', { title: 'My Cart', path: '/cart', products });
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