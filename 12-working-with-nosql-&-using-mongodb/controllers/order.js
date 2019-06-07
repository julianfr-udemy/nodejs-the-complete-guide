exports.get = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders();

    res.render('order/orders.pug', { title: 'My Cart', path: '/cart', orders });
  } catch (error) {
    console.error(error);
  }
}

exports.post = async (req, res, next) => {
  try {
    await req.user.addOrder();

    res.redirect('/orders');
  } catch (error) {
    console.log(error);
  }
}