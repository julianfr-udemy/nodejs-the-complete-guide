const Product = require('../models/product');

exports.get = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    res.render('cart/index', { title: 'My Cart', path: '/cart', products });
  } catch (error) {
    console.log(error);
  }
};

exports.post = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { Id: req.params.product } });
    const product = products ? products[0] : null;

    if (product) {
      await product.cart_item.update({ quantity: product.cart_item.quantity + 1 });
    } else {
      const p = await Product.findByPk(req.params.product);
      await cart.addProduct(p, { through: { quantity: 1 } });
    }

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: req.params.product } });
    const product = products ? products[0] : null;

    if (product) await product.item.destroy();

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};