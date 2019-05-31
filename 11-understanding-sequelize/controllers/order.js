exports.get = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({ include: ['products'] });

    res.render('order/orders.pug', { title: 'My Cart', path: '/cart', orders });
  } catch (error) {
    console.error(error);
  }
}

exports.post = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const order = await req.user.createOrder();

    await order.addProducts(products.map(product => {
      product.order_item = { quantity: product.cart_item.quantity }
      return product;
    }));
    await cart.setProducts(null);
    res.redirect('/orders');
  } catch (error) {
    console.log(error);
  }
}