const router = require('express').Router();

const { products } = require('./admin');

router.get('/', (req, res, next) => {
  res.render('shop', {
    products,
    title: 'My Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;

