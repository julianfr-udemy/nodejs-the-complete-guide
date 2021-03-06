const Order = require('../models/order');

exports.get = async (req, res, next) => {
  try {
    const orders = await Order.find({ 'user._id': req.user._id });

    res.render('order/orders.pug', { title: 'My Cart', path: '/cart', orders });
  } catch (error) {
    console.error(error);
  }
}

exports.post = async (req, res, next) => {
  try {
    await req.user.addOrder();

    res.redirect('/order');
  } catch (error) {
    console.log(error);
  }
}