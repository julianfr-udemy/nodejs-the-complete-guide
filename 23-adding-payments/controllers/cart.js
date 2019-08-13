const Product = require('../models/product');
const Stripe = require('stripe');
const stripe = Stripe(process.env.stripePublicKey);

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

exports.checkoutGet = async (req, res, next) => {
  try {
    const user = await req.user.populate('cart.products._id').execPopulate();
    const products = user.cart.products;
    const total = products.reduce((previous, p) => previous + (p.quantity * p._id.price), 0);

    res.render('cart/checkout', { title: 'Chechout', path: '/cart/checkout', products, total });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
}

exports.checkoutPost = async (req, res, next) => {
  try {
    const customer = await stripe.customers.create({
      email: request.body.stripeEmail,
      source: request.body.stripeToken
    })

    const charge = await stripe.charges.create({
      customer: customer.id,
      description: 'T-shirt',
      amount: 500,
      currency: 'usd',
    });

    res.render('cart/checkout', { title: 'Chechout', path: '/cart/checkout', products, total });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
}